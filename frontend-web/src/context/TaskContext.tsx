import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { Task } from '../../../backend/src/models/Task';
import { useI18n } from './I18nContext';

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
    updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    getTasksByNoteId: (noteId: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask moet binnen een TaskProvider gebruikt worden');
    }
    return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuth();
    const { t } = useI18n();

    // Luister naar taken van de huidige gebruiker
    useEffect(() => {
        if (!currentUser) {
            setTasks([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', currentUser.uid),
            orderBy('position')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const taskData = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                    createdAt: doc.data().createdAt?.toDate(),
                    updatedAt: doc.data().updatedAt?.toDate(),
                    deadline: doc.data().deadline?.toDate()
                } as Task));
                setTasks(taskData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error('Fout bij het ophalen van taken:', err);
                setError(t('tasks.error.load'));
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser, t]);

    const addTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!currentUser) throw new Error(t('auth.error.login_required'));

        try {
            // Controleer of we een geldige sourceNoteId hebben
            if (!taskData.sourceNoteId) {
                throw new Error('Een geldige sourceNoteId is vereist voor het maken van een taak');
            }

            const now = new Date();
            const newTask = {
                ...taskData,
                userId: currentUser.uid,
                createdAt: now,
                updatedAt: now,
                status: taskData.status || 'todo',
                position: taskData.position || 0,
                priority: taskData.priority || 'medium'
            };
            
            const docRef = await addDoc(collection(db, 'tasks'), newTask);
            return docRef.id;
        } catch (err) {
            console.error('TaskContext: Fout bij het toevoegen van taak:', err);
            throw err;
        }
    }, [currentUser, t]);

    const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
        if (!currentUser) throw new Error(t('auth.error.login_required'));

        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                ...updates,
                updatedAt: new Date()
            });
        } catch (err) {
            console.error('Fout bij het bijwerken van taak:', err);
            throw new Error(t('tasks.error.update'));
        }
    }, [currentUser, t]);

    const deleteTask = useCallback(async (taskId: string) => {
        if (!currentUser) throw new Error(t('auth.error.login_required'));

        try {
            await deleteDoc(doc(db, 'tasks', taskId));
        } catch (err) {
            console.error('Fout bij het verwijderen van taak:', err);
            throw new Error(t('tasks.error.delete'));
        }
    }, [currentUser, t]);

    const getTasksByNoteId = useCallback((noteId: string) => {
        return tasks.filter(task => task.sourceNoteId === noteId);
    }, [tasks]);

    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            error,
            addTask,
            updateTask,
            deleteTask,
            getTasksByNoteId
        }}>
            {children}
        </TaskContext.Provider>
    );
}; 
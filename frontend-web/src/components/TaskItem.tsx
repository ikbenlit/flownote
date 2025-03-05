import React, { useState } from 'react';
import { Task } from '../../../backend/src/models/Task';
import { useTask } from '../context/TaskContext';
import { useI18n } from '../context/I18nContext';
import { Link } from 'react-router-dom';

interface TaskItemProps {
    task: Task;
    compact?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, compact = false }) => {
    const { updateTask, deleteTask } = useTask();
    const { t } = useI18n();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<Task>(task);
    const [isDeleting, setIsDeleting] = useState(false);

    // Status klassen
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'todo':
                return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
            case 'in_progress':
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
            case 'done':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
            default:
                return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
        }
    };

    // Prioriteit klassen
    const getPriorityClass = (priority?: string) => {
        switch (priority) {
            case 'low':
                return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
            case 'medium':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
            case 'high':
                return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
            default:
                return '';
        }
    };

    // Taak bijwerken
    const handleUpdate = async () => {
        try {
            await updateTask(task.id, editedTask);
            setIsEditing(false);
        } catch (error) {
            console.error('Fout bij het bijwerken van de taak:', error);
        }
    };

    // Taak verwijderen
    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            setIsDeleting(false);
        } catch (error) {
            console.error('Fout bij het verwijderen van de taak:', error);
        }
    };

    // Status wijzigen
    const handleStatusChange = async (newStatus: 'todo' | 'in_progress' | 'done') => {
        try {
            await updateTask(task.id, { status: newStatus });
        } catch (error) {
            console.error('Fout bij het wijzigen van de status:', error);
        }
    };

    // Compacte weergave
    if (compact) {
        return (
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        task.priority === 'high' ? 'bg-red-500' : 
                        task.priority === 'medium' ? 'bg-yellow-500' : 
                        task.priority === 'low' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></span>
                    <span className="font-medium">{task.title}</span>
                </div>
                <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs mr-2 ${getStatusClass(task.status)}`}>
                        {t(`tasks.status.${task.status}`)}
                    </span>
                    {task.deadline && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {task.deadline.toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    // Bewerkingsformulier
    if (isEditing) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                <h3 className="text-lg font-medium mb-4">{t('tasks.edit')}</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('notes.title_label')}</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('tasks.status')}</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={editedTask.status}
                            onChange={(e) => setEditedTask({...editedTask, status: e.target.value as 'todo' | 'in_progress' | 'done'})}
                        >
                            <option value="todo">{t('tasks.status.todo')}</option>
                            <option value="in_progress">{t('tasks.status.in_progress')}</option>
                            <option value="done">{t('tasks.status.done')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('tasks.priority')}</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={editedTask.priority || ''}
                            onChange={(e) => setEditedTask({...editedTask, priority: e.target.value as 'low' | 'medium' | 'high' | undefined})}
                        >
                            <option value="">{t('none')}</option>
                            <option value="low">{t('tasks.priority.low')}</option>
                            <option value="medium">{t('tasks.priority.medium')}</option>
                            <option value="high">{t('tasks.priority.high')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('tasks.deadline')}</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={editedTask.deadline ? new Date(editedTask.deadline.getTime() - (editedTask.deadline.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                setEditedTask({...editedTask, deadline: date});
                            }}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={() => setIsEditing(false)}
                        >
                            {t('tasks.cancel')}
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={handleUpdate}
                        >
                            {t('tasks.save')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Verwijderbevestiging
    if (isDeleting) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                <h3 className="text-lg font-medium mb-4">{t('tasks.delete.title')}</h3>
                <p className="mb-4">{t('tasks.delete.confirmation')}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setIsDeleting(false)}
                    >
                        {t('tasks.cancel')}
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        {t('tasks.delete')}
                    </button>
                </div>
            </div>
        );
    }

    // Normale weergave
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium">{task.title}</h3>
                <div className="flex space-x-2">
                    <button
                        className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                        onClick={() => setIsEditing(true)}
                        aria-label={t('tasks.edit')}
                        title={t('tasks.edit')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        onClick={() => setIsDeleting(true)}
                        aria-label={t('tasks.delete')}
                        title={t('tasks.delete')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">{task.extractedText}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">{t('tasks.status')}:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
                        {t(`tasks.status.${task.status}`)}
                    </span>
                </div>
                
                {task.priority && (
                    <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">{t('tasks.priority')}:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                            {t(`tasks.priority.${task.priority}`)}
                        </span>
                    </div>
                )}
                
                {task.deadline && (
                    <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">{t('tasks.deadline')}:</span>
                        <span className="text-sm">{task.deadline.toLocaleDateString()}</span>
                    </div>
                )}
            </div>
            
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    <Link to={`/notes/${task.sourceNoteId}`} className="hover:underline">
                        {t('tasks.source')}: {task.sourceNoteTitle}
                    </Link>
                </div>
                
                <div className="flex space-x-2">
                    {task.status !== 'todo' && (
                        <button
                            className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={() => handleStatusChange('todo')}
                        >
                            {t('tasks.status.todo')}
                        </button>
                    )}
                    
                    {task.status !== 'in_progress' && (
                        <button
                            className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800"
                            onClick={() => handleStatusChange('in_progress')}
                        >
                            {t('tasks.status.in_progress')}
                        </button>
                    )}
                    
                    {task.status !== 'done' && (
                        <button
                            className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800"
                            onClick={() => handleStatusChange('done')}
                        >
                            {t('tasks.status.done')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem; 
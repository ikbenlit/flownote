import { DocumentData } from 'firebase-admin/firestore';

export interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'done';
    sourceNoteId: string;
    sourceNoteTitle: string;
    extractedText: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    priority?: 'low' | 'medium' | 'high';
    deadline?: Date;
    position: number; // Voor de volgorde in Kanban kolommen
}

export interface TaskDocument extends Task, DocumentData {}

// Helper functies voor het werken met taken
export const createTask = (data: Partial<Task>): Task => {
    const now = new Date();
    return {
        id: '',
        title: '',
        status: 'todo',
        sourceNoteId: '',
        sourceNoteTitle: '',
        extractedText: '',
        createdAt: now,
        updatedAt: now,
        userId: '',
        position: 0,
        ...data
    };
};

// Constanten voor de Firestore collectie
export const TASKS_COLLECTION = 'tasks'; 
import { DocumentData } from 'firebase-admin/firestore';

export interface TaskMarking {
    id: string;
    startOffset: number;
    endOffset: number;
    extractedTaskId?: string; // Optioneel, alleen aanwezig als de markering is geëxtraheerd naar een taak
    markedText: string;
    createdAt: Date;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    taskMarkings: TaskMarking[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    extractedTaskIds: string[]; // IDs van taken die uit deze notitie zijn geëxtraheerd
}

export interface NoteDocument extends Note, DocumentData {}

// Helper functies voor het werken met notities
export const createNote = (data: Partial<Note>): Note => {
    const now = new Date();
    return {
        id: '',
        title: '',
        content: '',
        taskMarkings: [],
        extractedTaskIds: [],
        createdAt: now,
        updatedAt: now,
        userId: '',
        ...data
    };
};

// Constanten voor de Firestore collectie
export const NOTES_COLLECTION = 'notes'; 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTES_COLLECTION = exports.createNote = void 0;
// Helper functies voor het werken met notities
const createNote = (data) => {
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
exports.createNote = createNote;
// Constanten voor de Firestore collectie
exports.NOTES_COLLECTION = 'notes';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_COLLECTION = exports.createTask = void 0;
// Helper functies voor het werken met taken
const createTask = (data) => {
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
exports.createTask = createTask;
// Constanten voor de Firestore collectie
exports.TASKS_COLLECTION = 'tasks';

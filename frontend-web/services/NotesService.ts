import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Note, NoteInput } from '@/types/note';

const notesCollection = collection(db, 'notes');

const convertFirestoreNote = (doc: any): Note => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    tags: data.tags || [],
    taskMarkings: data.taskMarkings || [],
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    userId: data.userId,
    extractedTaskIds: data.extractedTaskIds || [],
  };
};

export const NotesService = {
  async getUserNotes(userId: string): Promise<Note[]> {
    try {
      const q = query(notesCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreNote);
    } catch (error) {
      console.error('Error fetching user notes:', error);
      throw error;
    }
  },

  async createNote(userId: string, noteInput: NoteInput): Promise<string> {
    try {
      const noteData = {
        ...noteInput,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(notesCollection, noteData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  async updateNote(noteId: string, noteInput: Partial<NoteInput>): Promise<void> {
    try {
      const noteRef = doc(notesCollection, noteId);
      await updateDoc(noteRef, {
        ...noteInput,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  async deleteNote(noteId: string): Promise<void> {
    try {
      const noteRef = doc(notesCollection, noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
}; 
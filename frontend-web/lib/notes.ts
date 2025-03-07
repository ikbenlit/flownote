import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, DocumentData } from 'firebase/firestore';
import { db } from './firebase';
import { Note, NoteInput } from '../types/notes';

const NOTES_COLLECTION = 'notes';

export const notesCollection = collection(db, NOTES_COLLECTION);

// Helper functie om Firestore data naar Note type te converteren
const convertFirestoreNote = (doc: DocumentData): Note => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    tags: data.tags,
    taskMarkings: data.taskMarkings,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    userId: data.userId,
  };
};

// Notities ophalen voor een specifieke gebruiker
export const getUserNotes = async (userId: string): Promise<Note[]> => {
  try {
    const q = query(
      notesCollection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreNote);
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Enkele notitie ophalen
export const getNote = async (noteId: string): Promise<Note | null> => {
  try {
    const noteDoc = await getDoc(doc(notesCollection, noteId));
    if (!noteDoc.exists()) return null;
    return convertFirestoreNote(noteDoc);
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
};

// Nieuwe notitie aanmaken
export const createNote = async (userId: string, noteInput: NoteInput): Promise<string> => {
  try {
    const now = Timestamp.now();
    const noteData = {
      ...noteInput,
      userId,
      createdAt: now,
      updatedAt: now,
    };
    
    const docRef = await addDoc(notesCollection, noteData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Notitie bijwerken
export const updateNote = async (noteId: string, noteInput: Partial<NoteInput>): Promise<void> => {
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
};

// Notitie verwijderen
export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    await deleteDoc(doc(notesCollection, noteId));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}; 
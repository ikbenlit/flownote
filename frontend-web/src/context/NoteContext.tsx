import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase';

// Define the Note type
export interface Note {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}

// Define the context type
interface NoteContextType {
  notes: Note[];
  loading: boolean;
  error: string | null;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<string | null>;
  updateNote: (id: string, note: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>) => Promise<boolean>;
  deleteNote: (id: string) => Promise<boolean>;
  getNoteById: (id: string) => Note | undefined;
  searchNotes: (query: string) => Note[];
}

// Create the context
const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Create the provider component
export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes when the component mounts or when the user changes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const user = auth.currentUser;
        if (!user) {
          setNotes([]);
          setLoading(false);
          return;
        }

        const notesQuery = query(
          collection(db, 'notes'),
          where('userId', '==', user.uid),
          orderBy('updatedAt', 'desc')
        );

        const querySnapshot = await getDocs(notesQuery);
        const fetchedNotes: Note[] = [];
        
        querySnapshot.forEach((doc) => {
          fetchedNotes.push({ id: doc.id, ...doc.data() } as Note);
        });

        setNotes(fetchedNotes);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Failed to fetch notes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Set up an auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchNotes();
      } else {
        setNotes([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Add a new note
  const addNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to add a note');
        throw new Error('You must be logged in to add a note');
      }

      const now = Timestamp.now();
      const newNote: Omit<Note, 'id'> = {
        ...noteData,
        userId: user.uid,
        createdAt: now,
        updatedAt: now,
      };

      // Add retry logic for Firestore operations
      let attempts = 0;
      const maxAttempts = 3;
      let docRef;

      while (attempts < maxAttempts) {
        try {
          docRef = await addDoc(collection(db, 'notes'), newNote);
          break; // Success, exit the retry loop
        } catch (err) {
          attempts++;
          console.error(`Error adding note (attempt ${attempts}/${maxAttempts}):`, err);
          
          if (attempts >= maxAttempts) {
            throw err; // Rethrow after max attempts
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }
      
      if (!docRef) {
        throw new Error('Failed to add note after multiple attempts');
      }
      
      // Update the local state
      setNotes((prevNotes) => [
        { ...newNote, id: docRef.id } as Note,
        ...prevNotes,
      ]);

      return docRef.id;
    } catch (err) {
      console.error('Error adding note:', err);
      setError('Failed to add note. Please try again.');
      return null;
    }
  };

  // Update an existing note
  const updateNote = async (
    id: string, 
    noteData: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>
  ): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to update a note');
        throw new Error('You must be logged in to update a note');
      }

      const noteRef = doc(db, 'notes', id);
      const updateData = {
        ...noteData,
        updatedAt: Timestamp.now(),
      };

      // Add retry logic for Firestore operations
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          await updateDoc(noteRef, updateData);
          break; // Success, exit the retry loop
        } catch (err) {
          attempts++;
          console.error(`Error updating note (attempt ${attempts}/${maxAttempts}):`, err);
          
          if (attempts >= maxAttempts) {
            throw err; // Rethrow after max attempts
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }

      // Update the local state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, ...noteData, updatedAt: Timestamp.now() } : note
        )
      );

      return true;
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Failed to update note. Please try again.');
      return false;
    }
  };

  // Delete a note
  const deleteNote = async (id: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to delete a note');
        throw new Error('You must be logged in to delete a note');
      }

      const noteRef = doc(db, 'notes', id);
      
      // Add retry logic for Firestore operations
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          await deleteDoc(noteRef);
          break; // Success, exit the retry loop
        } catch (err) {
          attempts++;
          console.error(`Error deleting note (attempt ${attempts}/${maxAttempts}):`, err);
          
          if (attempts >= maxAttempts) {
            throw err; // Rethrow after max attempts
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }

      // Update the local state
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      return true;
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note. Please try again.');
      return false;
    }
  };

  // Get a note by ID
  const getNoteById = (id: string): Note | undefined => {
    return notes.find((note) => note.id === id);
  };

  // Search notes by title, content, or tags
  const searchNotes = (searchQuery: string): Note[] => {
    if (!searchQuery.trim()) {
      return notes;
    }

    const query = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  };

  const value: NoteContextType = {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    getNoteById,
    searchNotes,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

// Create a custom hook to use the context
export const useNotes = (): NoteContextType => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
}; 
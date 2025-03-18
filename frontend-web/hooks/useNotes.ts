import { useContext } from 'react';
import { NoteContext } from '@/context/NoteContext';
import { Note } from '@/types/note';

export function useNotes() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
} 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAIGenerator from '../components/OpenAIGenerator';
import { useNotes } from '../context/NoteContext';

const AIGeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);

  const handleSaveAsNote = async (text: string) => {
    try {
      // Extract a title from the first line or use a default
      const lines = text.split('\n').filter(line => line.trim());
      const title = lines.length > 0 ? lines[0].substring(0, 50) : 'Gegenereerde tekst';
      
      // Create a new note with the generated text
      const noteId = await addNote({
        title,
        content: text,
        tags: ['ai-generated']
      });
      
      if (noteId) {
        setSavedNoteId(noteId);
        // Optionally navigate to the new note
        // navigate(`/notes/${noteId}`);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleViewNote = () => {
    if (savedNoteId) {
      navigate(`/notes/${savedNoteId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">AI Tekstgenerator</h1>
          <button
            onClick={() => navigate('/notes')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Terug naar notities
          </button>
        </div>
        
        <p className="mb-6 text-gray-600">
          Gebruik AI om verschillende soorten teksten te genereren. Kies een type tekst, 
          voer een prompt in en laat de AI een tekst voor je schrijven.
        </p>
        
        {savedNoteId && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">
              Tekst succesvol opgeslagen als notitie!
            </p>
            <button
              onClick={handleViewNote}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              Bekijk notitie
            </button>
          </div>
        )}
        
        <OpenAIGenerator onTextGenerated={handleSaveAsNote} />
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Tips voor effectieve prompts:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Wees specifiek over het onderwerp en doel van de tekst</li>
            <li>Geef aan voor welk publiek de tekst bedoeld is</li>
            <li>Specificeer de gewenste toon (formeel, informeel, etc.)</li>
            <li>Vermeld belangrijke punten die in de tekst moeten worden opgenomen</li>
            <li>Gebruik bestaande tekst als context voor verbeteringen of uitbreidingen</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorPage; 
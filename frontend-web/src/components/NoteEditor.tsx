import React, { useState, useEffect } from 'react';
import { Note } from '../context/NoteContext';
import AIAssistant from './AIAssistant';
import TipTapEditor from './TipTapEditor';

interface NoteEditorProps {
  initialNote?: Partial<Note>;
  onSave: (note: { title: string; content: string; tags: string[] }) => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  initialNote,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialNote?.tags || []);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
      setTags(initialNote.tags || []);
    }
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: { title?: string; content?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave({ title, content, tags });
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle AI generated text
  const handleApplyAIText = (generatedText: string) => {
    setContent(generatedText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block font-patrick-hand text-lg text-gray-700 dark:text-dark-text-primary mb-2">
          Titel
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 font-caveat text-xl border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:border-blue-500 dark:focus:border-dark-accent-blue transition-all duration-200"
          placeholder="Geef je notitie een titel..."
          required
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="content" className="block font-patrick-hand text-lg text-gray-700 dark:text-dark-text-primary mb-2">
            Inhoud
          </label>
          <AIAssistant content={content} onApplyText={handleApplyAIText} />
        </div>
        <TipTapEditor 
          content={content} 
          onChange={setContent} 
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      <div>
        <label htmlFor="tags" className="block font-patrick-hand text-lg text-gray-700 dark:text-dark-text-primary mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full font-patrick-hand text-sm bg-blue-100 dark:bg-dark-bg-tertiary text-blue-800 dark:text-dark-accent-blue"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-blue-600 dark:text-dark-accent-blue hover:text-blue-800 dark:hover:text-dark-accent-blue-light"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="flex-grow px-4 py-2 font-patrick-hand text-lg border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:border-blue-500 dark:focus:border-dark-accent-blue transition-all duration-200"
            placeholder="Voeg tags toe..."
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 font-patrick-hand text-lg bg-blue-500 dark:bg-dark-accent-blue text-white rounded-xl hover:bg-blue-600 dark:hover:bg-dark-accent-blue-light focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:ring-offset-2 transition-colors duration-200"
          >
            Tag Toevoegen
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue transition-colors duration-200"
        >
          Annuleren
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-dark-accent-blue hover:bg-blue-700 dark:hover:bg-dark-accent-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue transition-colors duration-200"
        >
          Opslaan
        </button>
      </div>
    </form>
  );
}; 
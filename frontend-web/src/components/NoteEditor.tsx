import React, { useState, useEffect, useCallback, memo } from 'react';
import { Note } from '../context/NoteContext';
import AIAssistant from './AIAssistant';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { TaskMarkExtension } from './tiptap/extensions/TaskMarkExtension';
import { useTask } from '../context/TaskContext';
import { Editor } from '@tiptap/core';

interface EditorToolbarProps {
  editor: Editor | null;
  onFormatting: (command: () => void) => void;
}

const EditorToolbar = memo(({ editor, onFormatting }: EditorToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-2 border border-gray-200 dark:border-dark-border-primary rounded-lg bg-white dark:bg-dark-bg-secondary">
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleBold().run())}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Vet (Ctrl+B)"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleItalic().run())}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Cursief (Ctrl+I)"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleUnderline().run())}
        className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Onderstrepen (Ctrl+U)"
      >
        <u>U</u>
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-dark-border-primary mx-1" />
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Kop 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Kop 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Kop 3"
      >
        H3
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-dark-border-primary mx-1" />
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleBulletList().run())}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Bullet lijst"
      >
        • Lijst
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleOrderedList().run())}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Genummerde lijst"
      >
        1. Lijst
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-dark-border-primary mx-1" />
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Voer de URL in:');
          if (url) {
            onFormatting(() => editor.chain().focus().setLink({ href: url }).run());
          }
        }}
        className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title="Link invoegen"
      >
        🔗 Link
      </button>
    </div>
  );
});

EditorToolbar.displayName = 'EditorToolbar';

interface NoteEditorProps {
  initialNote?: Partial<Note>;
  onSave: (note: { title: string; content: string; tags: string[]; taskMarkings: any[] }) => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  initialNote,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialNote?.tags || []);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const { addTask } = useTask();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline'
        }
      }),
      TaskMarkExtension.configure({
        HTMLAttributes: {
          class: 'bg-yellow-200 dark:bg-yellow-700 cursor-pointer',
        },
        onTaskMarkClick: async (attrs) => {
          if (!editor) return;
          
          const { startOffset, endOffset } = attrs;
          const text = editor.state.doc.textBetween(startOffset || 0, endOffset || 0);
          
          try {
            await addTask({
              title: text,
              status: 'todo',
              sourceNoteId: initialNote?.id || '',
              sourceNoteTitle: title,
              extractedText: text,
              position: 0,
              userId: '', // Dit wordt automatisch ingevuld door de TaskContext
            });
          } catch (error) {
            console.error('Fout bij het maken van taak:', error);
          }
        },
      }),
    ],
    content: initialNote?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none w-full px-4 py-3 font-kalam text-lg border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:border-blue-500 dark:focus:border-dark-accent-blue transition-all duration-200',
      },
      handleKeyDown: (_, event) => {
        console.log('Editor KeyDown:', event.key);
        
        // Alleen Escape afhandelen voor het voorkomen van form submission
        if (event.key === 'Escape') {
          event.preventDefault();
          return true;
        }
        
        // Laat TipTap Enter-toets standaard afhandelen voor lijsten en koppen
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      console.log('Editor Update:', {
        isFocused: editor.isFocused,
        selection: editor.state.selection,
        content: editor.getHTML()
      });
    },
    onCreate: ({ editor }) => {
      console.log('Editor Created');
      // Focus de editor bij het aanmaken
      editor.commands.focus();
    },
    onDestroy: () => {
      console.log('Editor Destroyed');
    },
  });

  // Debug logging voor component lifecycle
  useEffect(() => {
    console.log('NoteEditor mounted');
    return () => {
      console.log('NoteEditor unmounted');
    };
  }, []);

  useEffect(() => {
    if (initialNote && editor) {
      console.log('InitialNote changed:', initialNote);
      setTitle(initialNote.title || '');
      editor.commands.setContent(initialNote.content || '');
      setTags(initialNote.tags || []);
      // Focus de editor na het laden van de inhoud
      editor.commands.focus();
    }
  }, [initialNote, editor]);

  // Debug logging voor formatting
  const handleFormatting = useCallback((command: () => void) => {
    if (!editor) return;
    console.log('Applying formatting command');
    
    // Voer de opmaak command uit
    command();
    
    // Herstel de focus zonder form submission te triggeren
    requestAnimationFrame(() => {
      editor.commands.focus();
    });
    
    console.log('Formatting applied, focusing editor');
  }, [editor]);

  // Debug logging voor form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Form submitted');
    
    // Validate form
    const newErrors: { title?: string; content?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Titel is verplicht';
    }
    
    if (!editor?.getText().trim()) {
      newErrors.content = 'Inhoud is verplicht';
    }
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors:', newErrors);
      setErrors(newErrors);
      return;
    }

    // Verzamel alle taakmarkeringen
    const taskMarkings = editor?.getJSON().content?.reduce((marks: any[], node: any) => {
      if (node.marks) {
        const taskMarks = node.marks.filter((mark: any) => mark.type === 'taskMark');
        return [...marks, ...taskMarks];
      }
      return marks;
    }, []) || [];
    
    console.log('Saving note with data:', {
      title,
      content: editor?.getHTML(),
      tags,
      taskMarkings,
    });
    
    onSave({
      title,
      content: editor?.getHTML() || '',
      tags,
      taskMarkings,
    });
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
    editor?.commands.setContent(generatedText);
  };

  const handleMarkTask = useCallback(() => {
    if (!editor || editor.state.selection.empty) return;
    
    editor.chain()
      .focus()
      .setTaskMark()
      .run();
  }, [editor]);

  // Voorkom dat het formulier automatisch wordt verzonden
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  };

  // Voorkom dat het formulier automatisch wordt verzonden bij focus events
  const handleFocus = (e: React.FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!editor) {
    return null;
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      onKeyDown={handleKeyDown} 
      onFocus={handleFocus}
      className="space-y-6"
      noValidate
    >
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
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleMarkTask}
              className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Als taak markeren
            </button>
            <AIAssistant content={editor?.getHTML()} onApplyText={handleApplyAIText} />
          </div>
        </div>
        <EditorToolbar editor={editor} onFormatting={handleFormatting} />
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="flex gap-1 p-1 rounded-lg border border-gray-200 dark:border-dark-border-primary bg-white dark:bg-dark-bg-secondary shadow-lg"
          >
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                editor.isActive('bold') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''
              }`}
              title="Vet (Ctrl+B)"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                editor.isActive('italic') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''
              }`}
              title="Cursief (Ctrl+I)"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                editor.isActive('underline') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''
              }`}
              title="Onderstrepen (Ctrl+U)"
            >
              <u>U</u>
            </button>
            <div className="w-px h-4 my-auto bg-gray-300 dark:bg-dark-border-primary" />
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Voer de URL in:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                editor.isActive('link') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''
              }`}
              title="Link invoegen"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={handleMarkTask}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                editor.isActive('taskMark') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''
              }`}
              title="Als taak markeren"
            >
              ✓
            </button>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
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
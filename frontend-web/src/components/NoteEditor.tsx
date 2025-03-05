import React, { useState, useEffect, useCallback, memo } from 'react';
import { Note, TaskMarking } from '../context/NoteContext';
import AIAssistant from './AIAssistant';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { TaskMarkExtension } from './tiptap/extensions/TaskMarkExtension';
import './tiptap/extensions/TaskMark.css';
import { useTask } from '../context/TaskContext';
import { Editor } from '@tiptap/core';
import { useI18n } from '../context/I18nContext';
import { FaTasks, FaTrash } from 'react-icons/fa';

interface EditorToolbarProps {
  editor: Editor | null;
  onFormatting: (command: () => void) => void;
}

const EditorToolbar = memo(({ editor, onFormatting }: EditorToolbarProps) => {
  if (!editor) return null;
  
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-2 border border-gray-200 dark:border-dark-border-primary rounded-lg bg-white dark:bg-dark-bg-secondary">
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleBold().run())}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.bold')}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleItalic().run())}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.italic')}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleUnderline().run())}
        className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.underline')}
      >
        <u>U</u>
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-dark-border-primary mx-1" />
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.heading1')}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.heading2')}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.heading3')}
      >
        H3
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-dark-border-primary mx-1" />
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleBulletList().run())}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.bullet_list')}
      >
        • Lijst
      </button>
      <button
        type="button"
        onClick={() => onFormatting(() => editor.chain().focus().toggleOrderedList().run())}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.ordered_list')}
      >
        1. Lijst
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-dark-border-primary mx-1" />
      <button
        type="button"
        onClick={() => {
          const url = window.prompt(t('formatting.enter_url'));
          if (url) {
            onFormatting(() => editor.chain().focus().setLink({ href: url }).run());
          }
        }}
        className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200 dark:bg-dark-bg-tertiary' : ''}`}
        title={t('formatting.insert_link')}
      >
        🔗 Link
      </button>
    </div>
  );
});

EditorToolbar.displayName = 'EditorToolbar';

interface NoteEditorProps {
  initialNote?: Partial<Note>;
  onSave: (note: { title: string; content: string; tags: string[]; taskMarkings: TaskMarking[] }) => void;
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
  const [taskMarkings, setTaskMarkings] = useState<TaskMarking[]>(initialNote?.taskMarkings || []);
  const { addTask } = useTask();
  const { t } = useI18n();

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
          class: 'bg-yellow-200 dark:bg-yellow-700 cursor-pointer !important',
          style: 'background-color: #fef08a; cursor: pointer;'
        },
        onTaskMarkClick: async (attrs) => {
          if (!editor) return;
          
          const { id, startOffset, endOffset, markedText } = attrs;
          const text = markedText || editor.state.doc.textBetween(startOffset || 0, endOffset || 0);
          
          console.log('TaskMark aangeklikt!', { id, text });
          
          try {
            console.log('Taak aanmaken met de volgende gegevens:', {
              title: text,
              status: 'todo',
              sourceNoteId: initialNote?.id || '',
              sourceNoteTitle: title
            });
            
            const taskId = await addTask({
              title: text,
              status: 'todo',
              sourceNoteId: initialNote?.id || '',
              sourceNoteTitle: title,
              extractedText: text,
              position: 0,
              userId: '', // Dit wordt automatisch ingevuld door de TaskContext
            });
            
            console.log('Taak succesvol aangemaakt met ID:', taskId);
            
            // Melding aan de gebruiker tonen
            alert(`Taak aangemaakt: "${text}"`);
          } catch (error) {
            console.error('Fout bij het maken van taak:', error);
            alert('Fout bij het maken van taak: ' + error);
          }
        },
        onTaskMarkRemove: (taskId) => {
          setTaskMarkings(prev => prev.filter(mark => mark.id !== taskId));
        }
      }),
    ],
    content: initialNote?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none w-full px-4 py-3 font-kalam text-lg border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:border-blue-500 dark:focus:border-dark-accent-blue transition-all duration-200',
      },
      handleKeyDown: (_, event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          return true;
        }
        
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      // Update taakmarkeringen bij wijzigingen
      const marks = extractTaskMarkingsFromEditor(editor);
      setTaskMarkings(marks);
    },
    onCreate: ({ editor }) => {
      editor.commands.focus();
    },
    onDestroy: () => {},
  });

  // Functie om taakmarkeringen uit de editor te extraheren
  const extractTaskMarkingsFromEditor = (editor: Editor): TaskMarking[] => {
    if (!editor) return [];
    
    const content = editor.getJSON();
    const marks: TaskMarking[] = [];
    
    // Loop door alle nodes in de inhoud
    if (content.content) {
      content.content.forEach((node: any) => {
        if (node.marks && Array.isArray(node.marks)) {
          const taskMarks = node.marks.filter((mark: any) => 
            mark && typeof mark === 'object' && mark.type === 'taskMark'
          );
          
          taskMarks.forEach((mark: any) => {
            if (mark.attrs && mark.attrs.id) {
              const timestamp = mark.attrs.createdAt ? 
                { seconds: Math.floor(mark.attrs.createdAt / 1000), nanoseconds: 0 } :
                { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };
                
              const taskMark: TaskMarking = {
                id: mark.attrs.id,
                startOffset: mark.attrs.startOffset || 0,
                endOffset: mark.attrs.endOffset || 0,
                markedText: mark.attrs.markedText || '',
                createdAt: timestamp as any
              };
              marks.push(taskMark);
            }
          });
        }
      });
    }
    
    return marks;
  };

  // Effect om taakmarkeringen te initialiseren na het mounten van de component
  useEffect(() => {
    if (editor) {
      // Initialiseer taakmarkeringen na het mounten
      const marks = extractTaskMarkingsFromEditor(editor);
      setTaskMarkings(marks);
    }
  }, [editor]);

  useEffect(() => {
    if (initialNote && editor) {
      setTitle(initialNote.title || '');
      editor.commands.setContent(initialNote.content || '');
      setTags(initialNote.tags || []);
      setTaskMarkings(initialNote.taskMarkings || []);
      editor.commands.focus();
    }
  }, [initialNote, editor]);

  const handleFormatting = useCallback((command: () => void) => {
    if (!editor) return;
    
    command();
    
    requestAnimationFrame(() => {
      editor.commands.focus();
    });
  }, [editor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newErrors: { title?: string; content?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = t('notes.error.title_required');
    }
    
    if (!editor?.getText().trim()) {
      newErrors.content = t('notes.error.content_required');
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Ververs de taakmarkeringen voordat we opslaan
    if (editor) {
      const freshMarkings = extractTaskMarkingsFromEditor(editor);
      setTaskMarkings(freshMarkings);
      
      console.log('Notitie opslaan met de volgende markeringen:', freshMarkings);
      
      // Maak taken van alle markeringen die nog geen taak hebben
      const tasksToCreate = freshMarkings.filter(mark => !mark.extractedTaskId);
      
      if (tasksToCreate.length > 0) {
        console.log(`${tasksToCreate.length} nieuwe taken worden aangemaakt...`);
      }
    }
    
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

  const handleApplyAIText = (generatedText: string) => {
    editor?.commands.setContent(generatedText);
  };

  const handleMarkTask = useCallback(() => {
    if (!editor || editor.state.selection.empty) return;
    
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    
    editor.chain()
      .focus()
      .setTaskMark()
      .run();
      
    // De taakmarkeringen worden automatisch bijgewerkt door de onUpdate handler
    console.log(`Tekst gemarkeerd als taak: ${selectedText}`);
    
    // Direct feedback aan de gebruiker
    const newTaskMarkings = extractTaskMarkingsFromEditor(editor);
    setTaskMarkings(newTaskMarkings);
  }, [editor]);

  const handleRemoveTaskMark = useCallback((taskId: string) => {
    if (!editor) return;
    
    editor.chain()
      .focus()
      .removeTaskMark(taskId)
      .run();
  }, [editor]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  };

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
          {t('notes.title_label')}
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 font-caveat text-xl border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:border-blue-500 dark:focus:border-dark-accent-blue transition-all duration-200"
          placeholder={t('notes.title_placeholder')}
          required
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="content" className="block font-patrick-hand text-lg text-gray-700 dark:text-dark-text-primary mb-2">
            {t('notes.content_label')}
          </label>
          <div className="flex items-center space-x-2">
            <AIAssistant content={editor?.getHTML()} onApplyText={handleApplyAIText} />
          </div>
        </div>
        
        {/* Informatie over taakmarkeringen */}
        <div className="flex items-center mb-2 text-sm text-gray-600 dark:text-dark-text-secondary">
          <FaTasks className="mr-1" />
          <span>{t('tasks.marked_count', { count: taskMarkings.length })}</span>
        </div>
        
        {/* Lijst van taakmarkeringen (indien er markeringen zijn) */}
        {taskMarkings.length > 0 && (
          <div className="mb-3 p-3 border border-yellow-300 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <FaTasks className="mr-2 text-yellow-600 dark:text-yellow-400" />
              {t('tasks.marked_texts')}
            </h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {taskMarkings.map((mark) => (
                <li 
                  key={mark.id} 
                  className="flex items-center justify-between text-sm p-2 bg-white dark:bg-dark-bg-tertiary rounded border border-yellow-200 dark:border-yellow-800"
                >
                  <span className="truncate flex-1 font-medium">{mark.markedText || '(Geen tekst)'}</span>
                  <div className="flex space-x-2 ml-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (editor) {
                          // Zoek de markering in de editor en trigger de onTaskMarkClick
                          const taskMark = editor.state.doc.descendants((node, pos) => {
                            if (!node.isText) return false;
                            const marks = node.marks.filter(m => 
                              m.type.name === 'taskMark' && m.attrs.id === mark.id
                            );
                            if (marks.length > 0) {
                              // Gebruik de positie om de exacte locatie van de markering te vinden
                              editor.commands.setTextSelection(pos);
                              return true;
                            }
                            return false;
                          });
                          
                          // Maak een taak van deze markering
                          addTask({
                            title: mark.markedText,
                            status: 'todo',
                            sourceNoteId: initialNote?.id || '',
                            sourceNoteTitle: title,
                            extractedText: mark.markedText,
                            position: 0,
                            userId: '', // Dit wordt automatisch ingevuld door de TaskContext
                          }).then(taskId => {
                            alert(`Taak aangemaakt: "${mark.markedText}"`);
                          });
                        }
                      }}
                      className="p-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      title={t('tasks.create_from_marking')}
                    >
                      + Taak maken
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveTaskMark(mark.id)}
                      className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title={t('tasks.remove_marking')}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <EditorToolbar editor={editor} onFormatting={handleFormatting} />
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="flex gap-1 p-1 rounded-lg border border-gray-200 dark:border-dark-border-primary bg-white dark:bg-dark-bg-secondary shadow-lg"
          >
            <button
              type="button"
              onClick={handleMarkTask}
              className="p-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary text-sm font-medium"
              title={t('tasks.mark')}
            >
              {t('tasks.mark')}
            </button>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      <div>
        <label htmlFor="tags" className="block font-patrick-hand text-lg text-gray-700 dark:text-dark-text-primary mb-2">
          {t('notes.tags_label')}
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
            placeholder={t('notes.tags_placeholder')}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 font-patrick-hand text-lg bg-blue-500 dark:bg-dark-accent-blue text-white rounded-xl hover:bg-blue-600 dark:hover:bg-dark-accent-blue-light focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:ring-offset-2 transition-colors duration-200"
          >
            {t('notes.add_tag')}
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue transition-colors duration-200"
        >
          {t('notes.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-dark-accent-blue hover:bg-blue-700 dark:hover:bg-dark-accent-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue transition-colors duration-200"
        >
          {t('notes.save')}
        </button>
      </div>
    </form>
  );
}; 
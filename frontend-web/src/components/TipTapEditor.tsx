import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaCheckSquare, 
         FaHeading, FaHighlighter, FaImage } from 'react-icons/fa';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ 
  content, 
  onChange,
  className = '' 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={`tiptap-editor-container ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="w-full px-4 py-3 font-kalam text-lg border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue focus:border-blue-500 dark:focus:border-dark-accent-blue transition-all duration-200 min-h-[200px] prose dark:prose-invert max-w-none"
      />
    </div>
  );
};

interface MenuBarProps {
  editor: Editor;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="tiptap-menu-bar flex flex-wrap gap-1 p-2 mb-2 border border-gray-200 dark:border-dark-border-primary rounded-xl bg-white dark:bg-dark-bg-secondary">
      {/* Text Styles */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('bold') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('italic') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Italic"
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('underline') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Underline"
      >
        <FaUnderline />
      </button>

      <div className="border-r border-gray-300 dark:border-dark-border-primary mx-1 h-6 self-center"></div>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Heading 1"
      >
        <FaHeading className="text-lg" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Heading 2"
      >
        <FaHeading className="text-base" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Heading 3"
      >
        <FaHeading className="text-sm" />
      </button>

      <div className="border-r border-gray-300 dark:border-dark-border-primary mx-1 h-6 self-center"></div>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('bulletList') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('orderedList') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Ordered List"
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('taskList') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Task List"
      >
        <FaCheckSquare />
      </button>

      <div className="border-r border-gray-300 dark:border-dark-border-primary mx-1 h-6 self-center"></div>

      {/* Highlight and Image */}
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFEB3B' }).run()}
        className={`menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${editor.isActive('highlight') ? 'bg-blue-100 dark:bg-dark-accent-blue/20 text-blue-700 dark:text-dark-accent-blue' : 'text-gray-700 dark:text-dark-text-secondary'}`}
        title="Highlight"
      >
        <FaHighlighter />
      </button>
      <button
        onClick={addImage}
        className="menu-item p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary text-gray-700 dark:text-dark-text-secondary"
        title="Add Image"
      >
        <FaImage />
      </button>
    </div>
  );
};

export default TipTapEditor; 
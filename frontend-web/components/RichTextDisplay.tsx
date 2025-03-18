import React from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

interface RichTextDisplayProps {
  content: string;
  variant?: 'preview' | 'full';
  className?: string;
}

export const RichTextDisplay: React.FC<RichTextDisplayProps> = ({
  content,
  variant = 'full',
  className = '',
}) => {
  // Sanitize de HTML-inhoud met alle benodigde tags en attributen
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'br',
      'span', 'div', 'mark', 'input', 'label'
    ],
    ALLOWED_ATTR: [
      'href', 'class', 'style', 'data-task-id', 'type', 'checked',
      'data-type', 'data-checked', 'data-color'
    ],
  });

  // Voor previews, verwijder HTML tags en beperk de lengte
  const displayContent = variant === 'preview' 
    ? `<p>${DOMPurify.sanitize(content, { ALLOWED_TAGS: [] }).slice(0, 150)}${content.length > 150 ? '...' : ''}</p>`
    : sanitizedContent;

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      {parse(displayContent)}
    </div>
  );
}; 
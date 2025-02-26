import React from 'react';

interface TipTapContentProps {
  content: string;
  className?: string;
}

const TipTapContent: React.FC<TipTapContentProps> = ({ content, className = '' }) => {
  // Function to sanitize and fix HTML content
  const processContent = (content: string) => {
    // Replace any potential raw HTML tags that might be displayed as text
    let processed = content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    
    return processed;
  };

  return (
    <div 
      className={`tiptap-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
};

export default TipTapContent; 
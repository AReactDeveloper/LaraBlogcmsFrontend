'use client'
import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import EDITOR_JS_TOOLS from './tools.js';

const EditorComponent = ({ setEditorOutput, content }) => {
  const editorRef = useRef(null);
  const holderRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;  // Prevent running on server

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holderRef.current,
        tools: EDITOR_JS_TOOLS,
        data: content ? JSON.parse(content) : {},
        autofocus: true,
        placeholder: 'Enter your content here...',
        onReady: () => {
          editorRef.current = editor;
          showInlineToolbar();
        },
        onChange: async () => {
          try {
            if (editorRef.current) {
              const outputData = await editorRef.current.save();
              setEditorOutput(JSON.stringify(outputData));
              showInlineToolbar();
            }
          } catch (error) {
            console.error('Failed to save content:', error);
          }
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [content, setEditorOutput]);

  const showInlineToolbar = () => {
    if (!holderRef.current) return;
    const toolbars = holderRef.current.querySelectorAll('.codex-editor__toolbar');
    toolbars.forEach(toolbar => {
      toolbar.style.display = 'block';
      toolbar.style.opacity = '1';
    });
  };

  return (
    <div ref={holderRef}></div>
  );
};

export default EditorComponent;

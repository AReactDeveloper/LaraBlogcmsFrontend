import React, { useEffect, useRef } from 'react';

const EditorComponent = ({ setEditorOutput, content }) => {
  const editorRef = useRef(null);
  const holderRef = useRef(null);

  useEffect(() => {
    let editor;

    import('@editorjs/editorjs').then(({ default: EditorJS }) => {
      import('./tools.js').then(({ default: EDITOR_JS_TOOLS }) => {
        editor = new EditorJS({
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
      });
    });

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

  return <div ref={holderRef}></div>;
};

export default EditorComponent;

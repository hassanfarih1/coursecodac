// components/TipTapEditor.jsx
import React, { useState, useCallback } from 'react'; // useCallback is already imported
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontSize } from '@tiptap/extension-font-size';
import { HexColorPicker } from 'react-colorful';

// --- Simple Popover Component (if you don't have one from a UI library) ---
const Popover = ({ trigger, content, isOpen, setIsOpen }) => {
  const togglePopover = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <div onClick={togglePopover}>{trigger}</div>
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-md p-2 mt-2"
             style={{ minWidth: '150px' }}>
          {content}
        </div>
      )}
    </div>
  );
};
// --- End Simple Popover Component ---

import '../styles/tiptap.css';

const TipTapEditor = ({ content, onUpdate, editable = true, label = "Content" }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      FontSize,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editable,
    editorProps: {
      attributes: {
        class: 'tiptap-content',
      },
    },
  });

  // --- MOVE handleSetLink useCallback HERE ---
  // Ensure this Hook call is unconditional and at the top level.
  const handleSetLink = useCallback(() => {
    // Check if editor is available before calling its methods
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setIsLinkPopoverOpen(false); // Close popover after setting link
  }, [editor]); // Add editor to the dependency array

  // Now, the early return is fine because all hooks above it are always called.
  if (!editor) {
    return null;
  }

  const setTextColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  const setFontSize = (size) => {
    editor.chain().focus().setFontSize(size).run();
  };

  return (
    <div className="tiptap-editor-wrapper">
      {editable && (
        <div className="tiptap-toolbar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            Paragraph
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Code Block
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Horizontal Rule
          </button>
          <button
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            Hard Break
          </button>

          {/* Link Controls */}
          <Popover
            isOpen={isLinkPopoverOpen}
            setIsOpen={setIsLinkPopoverOpen}
            trigger={
              <button
                className={editor.isActive('link') ? 'is-active' : ''}
                onClick={() => {
                  setLinkUrl(editor.getAttributes('link').href || '');
                  setIsLinkPopoverOpen(!isLinkPopoverOpen);
                }}
              >
                Set Link
              </button>
            }
            content={
              <div className="flex flex-col gap-2 p-2">
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
                      setIsLinkPopoverOpen(false);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      editor.chain().focus().extendMarkRange('link').unsetLink().run();
                      setLinkUrl('');
                      setIsLinkPopoverOpen(false);
                    }}
                    disabled={!editor.isActive('link')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Unlink
                  </button>
                </div>
              </div>
            }
          />

          {/* Font Size Select */}
          <select
            onChange={(e) => setFontSize(e.target.value)}
            value={editor.getAttributes('textStyle').fontSize || ''}
            className="tiptap-toolbar select"
          >
            <option value="">Font Size</option>
            <option value="12px">Small (12px)</option>
            <option value="14px">Normal (14px)</option>
            <option value="16px">Medium (16px)</option>
            <option value="18px">Large (18px)</option>
            <option value="20px">X-Large (20px)</option>
            <option value="24px">2XL (24px)</option>
            <option value="28px">3XL (28px)</option>
            <option value="32px">4XL (32px)</option>
          </select>

          {/* Color Picker for Text */}
          <Popover
            isOpen={isColorPickerOpen}
            setIsOpen={setIsColorPickerOpen}
            trigger={
              <button
                className={editor.getAttributes('textStyle').color ? 'is-active' : ''}
                style={{ color: editor.getAttributes('textStyle').color }}
              >
                Text Color
              </button>
            }
            content={
              <HexColorPicker
                color={editor.getAttributes('textStyle').color || '#000000'}
                onChange={(color) => setTextColor(color)}
              />
            }
          />

          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
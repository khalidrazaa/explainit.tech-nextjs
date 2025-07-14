'use client'

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import type { Editor } from "@tiptap/react";


interface Props {
  content: string;
  onChange: (html: string) => void;
}

interface MenuBarProps {
  editor: Editor;
}

export default function TipTapEditor({ content, onChange }: Props) {

    const editor = useEditor({
    extensions: [
        StarterKit,
        Image,
        Link,
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
    ],

    content,
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
    editorProps: {
        attributes: {
        class: "prose min-h-[300px] max-w-none border border-gray-300 p-4 rounded-md focus:outline-none",
        },
    },
    // ✅ Prevents rendering on server
    immediatelyRender: false,
    });

    return (
        <div>
        {editor && <MenuBar editor={editor} />}
        <EditorContent editor={editor} />
        </div>
    );
}

// Menu bar for formatting controls
function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-2">
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
                Bold
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                Bullet List
            </button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                Numbered List
            </button>
            <button onClick={() => editor.chain().focus().setImage({ src: prompt("Image URL") || "" }).run()}>
                Add Image
            </button>
            <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>
                Table
            </button>
            <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
                Clear
            </button>
        </div>
    );
}

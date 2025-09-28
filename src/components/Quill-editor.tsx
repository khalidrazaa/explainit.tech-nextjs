"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import react-quill to avoid SSR crash
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ content, onChange }: QuillEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={onChange}
      placeholder="Write something..."
    />
  );
}

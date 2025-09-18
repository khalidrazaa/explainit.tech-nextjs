'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export default function QuillEditor({ content, onChange }: Props) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={onChange}
      modules={modules}
      style={{ minHeight: '300px', maxHeight: '600px' }}
    />
  );
}

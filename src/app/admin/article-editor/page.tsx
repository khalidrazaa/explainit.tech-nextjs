'use client';

import { useState } from "react";
import QuillEditor from "../../../components/Quill-editor";

interface Article {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  status: "draft" | "published";
  createdAt: string;
  content: string;
}

export default function ArticleEditor() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft"); // default status
  const [message, setMessage] = useState(""); // For feedback messages
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Title and content are required.");
      setMessage("");
      return;
    }

    setError("");
    const article = {
      title,
      slug,
      category,
      subcategory,
      status,
      createdAt: new Date().toISOString(),
      content,
    };

    try {
      // Replace with your API call
      const res = await fetch("/api/articles/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });

      if (!res.ok) throw new Error("Failed to save draft");

      setMessage("Draft saved successfully!");
      setTimeout(() => setMessage(""), 5000); // hide after 5s
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to save draft");
      setMessage("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Article Editor</h1>

      <input
        placeholder="Title"
        className="w-full p-2 border mb-2"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
        }}
      />

      <input
        placeholder="Slug"
        className="w-full p-2 border mb-2"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <input
        placeholder="Category"
        className="w-full p-2 border mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Subcategory"
        className="w-full p-2 border mb-2"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      />

      <QuillEditor content={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Save Draft
      </button>

      {/* Feedback messages */}
      <div className="mt-4">
        {message && (
          <div className="rounded bg-green-100 p-2 text-sm text-green-700">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded bg-red-100 p-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
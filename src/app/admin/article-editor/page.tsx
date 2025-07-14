'use client'

import { useState } from "react";
import TipTapEditor from "../../../components/TipTapEditor";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const article = {
      title,
      slug,
      category,
      subcategory,
      status,
      createdAt: new Date().toISOString(),
      content,
    };

    console.log("Saving article:", article);
    // In production, send to API route or save as JSON
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Article</h1>

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

      <select
        className="p-2 border mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <TipTapEditor content={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Save Article
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DraftsPage() {
  const [articles, setArticles] = useState<unknown[]>([]);

  useEffect(() => {
    // TODO: Fetch drafts from API
    setArticles([
      { id: 1, title: "Draft 1", slug: "draft-1" },
      { id: 2, title: "Draft 2", slug: "draft-2" },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Draft Articles</h1>
      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.id} className="p-2 border rounded flex justify-between">
            <span>{a.title}</span>
            <Link
              href={`/admin/article/${a.slug}`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

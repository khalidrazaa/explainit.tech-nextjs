"use client";

import { useState } from "react";
import { getKeywords } from "../../../lib/services/keyword";

export default function TrendsPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const data = await getKeywords(keyword.trim());
      console.log("scrapped keywords",data);
      setResults(data.suggestions);
    } catch (err) {
      console.error("Error fetching keywords", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Keyword Trends</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {results.length > 0 && (
        <ul className="list-disc pl-6">
          {results.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
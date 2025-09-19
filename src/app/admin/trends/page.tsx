"use client";

import { useState, useEffect } from "react";

export default function TrendsPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/admin/trends")
      .then((r) => r.json())
      .then((data) => setTopics(data))
      .catch((e) => setError("Failed to load trends"));
  }, []);

  async function handleGenerate() {
    if (!selected) return setError("Pick a topic first");
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/admin/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selected, language: "en", tone: "informative", word_count: 900 }),
      });
      if (!res.ok) throw new Error("Generate failed");
      const data = await res.json();
      setMessage(`Draft created: ${data.title}`);
    } catch (err: any) {
      setError(err.message || "Failed to generate");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 7000);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Google Trends</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {topics.map((t: any) => (
          <div
            key={t.topic}
            onClick={() => setSelected(t.topic)}
            className={`p-3 border rounded cursor-pointer ${selected === t.topic ? "bg-blue-50 border-blue-400" : ""}`}
          >
            <strong>{t.topic}</strong>
            <div className="text-sm text-gray-500">{t.related_queries?.slice(0,3).join(", ")}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={handleGenerate} disabled={loading || !selected} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
          {loading ? "Generating..." : "Generate Article from LLM"}
        </button>
        {message && <div className="text-green-700">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
}

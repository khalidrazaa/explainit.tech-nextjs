"use client";

import { useState } from "react";
import { getKeywords, scrapeTrends } from "../../../lib/services/keyword";

export default function TrendsPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Separate states for each button
  const [scrapeMsg, setScrapeMsg] = useState<string | null>(null);
  const [searchMsg, setSearchMsg] = useState<string | null>(null);

  const [geo, setGeo] = useState("IN"); // default selection
  const [hours, setHours] = useState("168"); // default selection
  const [sts, setSts] = useState("active");

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setSearchMsg("Searching...related post/videos/news"); // clear previous message
    try {
      const data = await getKeywords(keyword.trim());
      console.log("scraped keywords", data);
      setResults(data.suggestions);
      setSearchMsg(`Found ${data.suggestions.length} suggestions`);
    } catch (err) {
      console.error("Error fetching keywords", err);
      setSearchMsg("Failed to fetch keyword suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeTrends = async () => {
    setScrapeMsg(`Scraping trends for ${geo}, last ${hours} hours...`);
    try {
      const res = await scrapeTrends(geo, hours, sts);
      console.log("Scrape result", res);
      setScrapeMsg(
        `Scrapped ${res.result.processed_rows} & added ${res.result.inserted_count} trends, for ${geo} ${hours} hours,  repeated ${res.result.matched_count} updated ${res.result.modified_count} Categorized ${res.result.categorized_count}`
      );
    } catch (err) {
      console.error("Error scraping trends", err);
      setScrapeMsg("Failed to scrape trends");
    }
  };

  return (
    <div className="p-2">
      {/* Top row with two sections */}
      <div className="flex justify-between gap-6 mb-6">
        {/* Scrape Trends Section */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold mb-4">Google Trending Keywords</h1>
          <div className="flex items-center gap-2">
            <select
              value={geo}
              onChange={(e) => setGeo(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="US">United States</option>
              <option value="IN">India</option>
            </select>
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="168">Past 7 days</option>
              <option value="48">Past 2 days</option>
              <option value="24">Past 24 hours</option>
              <option value="4">Past 4 hours</option>
            </select>
            <select
              value={sts}
              onChange={(e) => setSts(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            <button
              onClick={handleScrapeTrends}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Scrape (CSV)
            </button>
          </div>
          {/* Scrape status/error */}
          {scrapeMsg && (
            <p className="mt-2 text-sm text-gray-700">{scrapeMsg}</p>
          )}
        </div>

        {/* Keyword Search Section */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold mb-4">
            Search SerpApi for related items
          </h1>
          <div className="flex items-center gap-2">
            <input
              className="border p-2 rounded"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          {/* Search status/error */}
          {searchMsg && (
            <p className="mt-2 text-sm text-gray-700">{searchMsg}</p>
          )}
          {/* Search results */}
          {results.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-sm text-gray-800 space-y-1">
              {results.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
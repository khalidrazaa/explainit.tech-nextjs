import { apiFetch } from "../api";
import {  KeywordResponse } from "../../types/keywords";

export async function getKeywords(keyword: string): Promise<KeywordResponse> {
  return apiFetch<KeywordResponse>("/admin/trends/keywords", {
    method: "POST",
    body: JSON.stringify({ keyword }),
  });
}


export async function scrapeTrends(geo: string, hours: string, sts: string):
  Promise<{ status: string; geo: string; hours: string }> {
  const res = await fetch(`/admin/trends/scrape?geo=${geo}&hours=${hours}&sts=${sts}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to scrape trends");
  }
  return res.json();
}
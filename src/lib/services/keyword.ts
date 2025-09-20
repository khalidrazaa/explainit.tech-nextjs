import { apiFetch } from "../api";
import {  KeywordResponse } from "../../types/keywords";

export async function getKeywords(keyword: string): Promise<KeywordResponse> {
  return apiFetch<KeywordResponse>("/admin/trends/keywords", {
    method: "POST",
    body: JSON.stringify({ keyword }),
  });
}
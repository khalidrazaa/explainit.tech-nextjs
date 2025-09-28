export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  status: "draft" | "published";
  createdAt: string;
  content: string;
}

export interface KeywordResponse {
  keyword: string;
  suggestions: string[];
}

export interface ScrapeTrendsResponse  {
  status: string;
  geo: string;
  hours: string;
};
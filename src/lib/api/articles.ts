"use server";

import { api, ApiResponse } from "./api";

type ArticleSearchFilters = {
  category?: string;
  contributor?: string;
  issueNumber?: number;
};

type SortBy = "created_desc" | "created_asc" | "title_asc" | "title_desc";
type DateRange = "any" | "7d" | "30d" | "ytd";

type ArticleSearchParams = {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: SortBy;
  dateRange?: DateRange;
  filters?: ArticleSearchFilters;
};

type ArticleSearchResponse<T = unknown> = {
  results: T[];
  total?: number;
  page?: number;
  pageSize?: number;
};

function getQuery(params: ArticleSearchParams) {
  const query = new URLSearchParams();

  if (params.q) query.set("q", params.q);
  if (params.page != null) query.set("page", String(params.page));
  if (params.pageSize != null) query.set("pageSize", String(params.pageSize));

  if (params.sort) query.set("sort", params.sort);
  if (params.dateRange && params.dateRange !== "any") {
  query.set("dateRange", params.dateRange);}
  const f = params.filters;
  if (f?.contributor) query.set("contributor", f.contributor);
  if (f?.category) query.set("category", f.category);
  if (f?.issueNumber != null) query.set("issueNumber", String(f.issueNumber));

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export async function searchArticles<T = unknown>(
  params: ArticleSearchParams,
): Promise<ApiResponse<ArticleSearchResponse<T>>> {
  return api("GET", `/search${getQuery(params)}`);
}

export async function searchArticlesByTitle<T = unknown>(
  params: ArticleSearchParams,
): Promise<ApiResponse<ArticleSearchResponse<T>>> {
  return api("GET", `/search/title${getQuery(params)}`);
}

export async function searchArticlesByTitleAndContent<T = unknown>(
  params: ArticleSearchParams,
): Promise<ApiResponse<ArticleSearchResponse<T>>> {
  return api("GET", `/search/title-and-content${getQuery(params)}`);
}
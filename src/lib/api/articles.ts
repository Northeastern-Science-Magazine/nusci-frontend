"use server";

import { api, ApiResponse } from "./api";
import { Article as ArticleType } from "@/lib/types/types";
import { Category } from "@/lib/types/types";

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  category?: string;
  slug: string;
}

export interface MagazineIssue {
  id: string;
  issueNumber: number;
  thumbnailUrl: string;
  title: string;
  date: string;
}

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "featured-1",
    title: "Siberian Permafrost",
    description: "A photo-led story about the science (and spectacle) behind ice—built to read like a print spread.",
    imageUrl: "/icy.png",
    subtitle: "Climate Science",
    slug: "/articles/siberian-permafrost",
  },
  {
    id: "featured-2",
    title: "Chasing Totality",
    description: "A photo-led story about the science (and spectacle) behind eclipses—built to read like a print spread.",
    imageUrl: "/succulent.png",
    subtitle: "Astronomy",
    slug: "/articles/chasing-totality",
  },
  {
    id: "recent-1",
    title: "Urban Heat Islands, Explained",
    description: "How cities trap heat and what we can do about it—a deep dive into urban climate science.",
    imageUrl: "/london.png",
    subtitle: "Science + Society",
    slug: "/articles/urban-heat-islands",
  },
  {
    id: "recent-2",
    title: "How Microbiomes Shape Our World",
    description: "Exploring the invisible ecosystems that influence everything from our health to our environment.",
    imageUrl: "/moss.png",
    subtitle: "Research Spotlight",
    slug: "/articles/microbiomes",
  },
  {
    id: "recent-3",
    title: "5 Questions About CRISPR",
    description: "A concise guide to understanding gene editing technology.",
    imageUrl: "/icy.png",
    subtitle: "Quick Read",
    slug: "/articles/crispr-questions",
  },
  {
    id: "recent-4",
    title: "Why Science Needs Better Stories",
    description: "How narrative can bridge the gap between research and public understanding.",
    imageUrl: "/eclipse-image.png",
    subtitle: "Opinion",
    slug: "/articles/science-stories",
  },
  {
    id: "recent-5",
    title: "Designing an Issue Cover",
    description: "A look into the creative process behind our magazine design.",
    imageUrl: "/logo.png",
    subtitle: "Behind the Scenes",
    slug: "/articles/designing-covers",
  },
];

const FALLBACK_FEATURED_ARTICLES: Article[] = [FALLBACK_ARTICLES[0], FALLBACK_ARTICLES[1]];

const FALLBACK_RECENT_ARTICLES: Article[] = [
  FALLBACK_ARTICLES[2],
  FALLBACK_ARTICLES[3],
  FALLBACK_ARTICLES[4],
  FALLBACK_ARTICLES[5],
  FALLBACK_ARTICLES[6],
];

const HARDCODED_MAGAZINES: MagazineIssue[] = [
  {
    id: "issue-60",
    issueNumber: 60,
    thumbnailUrl: "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue60.png",
    title: "Issue 60",
    date: "2024",
  },
  {
    id: "issue-59",
    issueNumber: 59,
    thumbnailUrl: "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue59.png",
    title: "Issue 59",
    date: "2024",
  },
  {
    id: "issue-58",
    issueNumber: 5,
    thumbnailUrl: "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue58.png",
    title: "Issue 58",
    date: "2024",
  },
  {
    id: "issue-57",
    issueNumber: 57,
    thumbnailUrl: "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue57.png",
    title: "Issue 57",
    date: "2024",
  },
  {
    id: "issue-56",
    issueNumber: 56,
    thumbnailUrl: "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue56.png",
    title: "Issue 56",
    date: "2023",
  },
];

// Extract the first image URL from articleContent
function extractFirstImageUrl(articleContent: Array<{ contentType: string; content: string }>): string | undefined {
  const imageItem = articleContent.find((item) => item.contentType === "image");
  return imageItem?.content;
}

// Extract description from first body paragraph
function extractDescription(articleContent: Array<{ contentType: string; content: string }>): string {
  const firstParagraph = articleContent.find((item) => item.contentType === "body_paragraph");
  return firstParagraph?.content || "";
}

// Map ArticleType to Article interface
function mapArticleTypeToArticle(articleType: ArticleType): Article {
  const imageUrl = extractFirstImageUrl(articleType.articleContent) || "";
  const description = extractDescription(articleType.articleContent);
  const subtitle = articleType.categories?.[0] || undefined;
  const category = articleType.categories?.[0] || undefined;

  return {
    id: articleType.slug,
    title: articleType.title,
    description,
    imageUrl,
    subtitle,
    category,
    slug: `/${articleType.slug}`,
  };
}

export async function getRecentArticles(limit: number = 6): Promise<Article[]> {
  try {
    const response = await searchArticles({
      limit,
      sortBy: "desc",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Articles search endpoint failed, using fallback recent articles");
      }
      return FALLBACK_RECENT_ARTICLES.slice(0, limit);
    }

    if (Array.isArray(response.data.results) && response.data.results.length > 0) {
      return response.data.results.map(mapArticleTypeToArticle);
    }

    return FALLBACK_RECENT_ARTICLES.slice(0, limit);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return FALLBACK_RECENT_ARTICLES.slice(0, limit);
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const response = await api<any>("GET", `/articles/search?limit=2&featured=true&sort=date&order=desc`);

    if (!response.ok) {
      console.warn("Featured articles search endpoint failed, using fallback featured articles");
      return FALLBACK_FEATURED_ARTICLES;
    }

    if (Array.isArray(response.data) && response.data.length >= 2) {
      return response.data;
    }

    return FALLBACK_FEATURED_ARTICLES;
  } catch (error) {
    console.error("Error fetching featured articles:", error);
    return FALLBACK_FEATURED_ARTICLES;
  }
}

export async function getMagazineIssues(): Promise<MagazineIssue[]> {
  return HARDCODED_MAGAZINES;
}

export interface ArticleSearchRequest {
  limit?: number;
  skip?: number;
  textQuery?: string;
  categories?: string[];
  sortBy?: "asc" | "desc";
}

export interface ArticleSearchResponse {
  results: ArticleType[];
  total: number;
}

export async function searchArticles(request: ArticleSearchRequest): Promise<ApiResponse<ArticleSearchResponse>> {
  return api<ArticleSearchResponse>("POST", "/articles/search", request);
}

export async function getArticleBySlug(slug: string): Promise<ApiResponse<ArticleType>> {
  return api<ArticleType>("GET", `/articles/slug/${slug}`);
}

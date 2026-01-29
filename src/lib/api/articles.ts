"use server";

import { api } from "./api";

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  slug: string;
}

export interface Statistics {
  legacyYears: number;
  publishedIssues: number;
  reachArticles: number;
}

export interface MagazineIssue {
  id: string;
  issueNumber: number;
  thumbnailUrl: string;
  title: string;
  date: string;
}

export interface CTAData {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
}

const FALLBACK_STATS: Statistics = {
  legacyYears: 17,
  publishedIssues: 66,
  reachArticles: 1300,
};

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "featured-1",
    title: "Siberian Permafrost",
    description:
      "A photo-led story about the science (and spectacle) behind ice—built to read like a print spread.",
    imageUrl: "/icy.png",
    subtitle: "Climate Science",
    slug: "/articles/siberian-permafrost",
  },
  {
    id: "featured-2",
    title: "Chasing Totality",
    description:
      "A photo-led story about the science (and spectacle) behind eclipses—built to read like a print spread.",
    imageUrl: "/succulent.png",
    subtitle: "Astronomy",
    slug: "/articles/chasing-totality",
  },
  {
    id: "recent-1",
    title: "Urban Heat Islands, Explained",
    description:
      "How cities trap heat and what we can do about it—a deep dive into urban climate science.",
    imageUrl: "/london.png",
    subtitle: "Science + Society",
    slug: "/articles/urban-heat-islands",
  },
  {
    id: "recent-2",
    title: "How Microbiomes Shape Our World",
    description:
      "Exploring the invisible ecosystems that influence everything from our health to our environment.",
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
    description:
      "How narrative can bridge the gap between research and public understanding.",
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

const FALLBACK_FEATURED_ARTICLES: Article[] = [
  FALLBACK_ARTICLES[0],
  FALLBACK_ARTICLES[1],
];

const FALLBACK_RECENT_ARTICLES: Article[] = [
  FALLBACK_ARTICLES[2],
  FALLBACK_ARTICLES[3],
  FALLBACK_ARTICLES[4],
  FALLBACK_ARTICLES[5],
  FALLBACK_ARTICLES[6],
];

const FALLBACK_MAGAZINES: MagazineIssue[] = [
  {
    id: "issue-60",
    issueNumber: 60,
    thumbnailUrl:
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue60.png",
    title: "Issue 60",
    date: "2024",
  },
  {
    id: "issue-59",
    issueNumber: 59,
    thumbnailUrl:
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue59.png",
    title: "Issue 59",
    date: "2024",
  },
  {
    id: "issue-58",
    issueNumber: 5,
    thumbnailUrl:
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue58.png",
    title: "Issue 58",
    date: "2024",
  },
  {
    id: "issue-57",
    issueNumber: 57,
    thumbnailUrl:
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue57.png",
    title: "Issue 57",
    date: "2024",
  },
  {
    id: "issue-56",
    issueNumber: 56,
    thumbnailUrl:
      "https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue56.png",
    title: "Issue 56",
    date: "2023",
  },
];

function buildQueryParams(params: Record<string, any>): string {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function getRecentArticles(limit: number = 6): Promise<Article[]> {
  try {
    const queryParams = buildQueryParams({ limit });
    const response = await api<any>("GET", `/articles/search${queryParams}`);

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Articles endpoint failed, using fallback recent articles",
        );
      }
      return FALLBACK_RECENT_ARTICLES.slice(0, limit);
    }

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }

    return FALLBACK_RECENT_ARTICLES.slice(0, limit);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return FALLBACK_RECENT_ARTICLES.slice(0, limit);
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const queryParams = buildQueryParams({ limit: 2, featured: true });
    const response = await api<any>("GET", `/articles${queryParams}`);

    if (!response.ok) {
      console.warn(
        "Featured articles endpoint failed, using fallback featured articles",
      );
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

export async function getStatistics(): Promise<Statistics> {
  try {
    const response = await api<Statistics>("GET", "/statistics");

    if (!response.ok) return FALLBACK_STATS;

    const data = response.data;
    if (
      typeof data?.legacyYears === "number" &&
      typeof data?.publishedIssues === "number" &&
      typeof data?.reachArticles === "number"
    ) {
      return data;
    }

    return FALLBACK_STATS;
  } catch {
    return FALLBACK_STATS;
  }
}

export async function getMagazineIssues(): Promise<MagazineIssue[]> {
  try {
    const response = await api<MagazineIssue[]>("GET", "/magazines");

    if (!response.ok || !Array.isArray(response.data)) {
      console.warn("Magazines endpoint failed, using fallback magazines");
      return FALLBACK_MAGAZINES;
    }

    if (response.data.length > 0) {
      return response.data;
    }

    return FALLBACK_MAGAZINES;
  } catch (error) {
    console.error("Error fetching magazines:", error);
    return FALLBACK_MAGAZINES;
  }
}

export async function getHomepageData() {
  const [stats, magazines, recentArticles, featuredArticles] =
    await Promise.allSettled([
      getStatistics(),
      getMagazineIssues(),
      getRecentArticles(6),
      getFeaturedArticles(),
    ]);

  return {
    stats: stats.status === "fulfilled" ? stats.value : FALLBACK_STATS,
    magazines:
      magazines.status === "fulfilled" ? magazines.value : FALLBACK_MAGAZINES,
    recentArticles:
      recentArticles.status === "fulfilled"
        ? recentArticles.value
        : FALLBACK_RECENT_ARTICLES.slice(0, 6),
    featuredArticles:
      featuredArticles.status === "fulfilled"
        ? featuredArticles.value
        : FALLBACK_FEATURED_ARTICLES,
    ctaData: {
      title: "Made by students. Read by everyone.",
      description:
        "Want to write, design, photograph, or build with us? NU Sci is a community for curious people.",
      primaryButtonText: "Learn about NU Sci",
      secondaryButtonText: "Join the team",
      backgroundImageSrc: "/icy.png",
      backgroundImageAlt: "A textured green moss background",
    },
  };
}

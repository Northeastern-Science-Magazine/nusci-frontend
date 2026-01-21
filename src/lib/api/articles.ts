// this file is for adding functions that call article-related endpoints

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

export async function getRecentArticles(): Promise<Article[]> {
  return [];
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return [];
}

export async function getStatistics(): Promise<Statistics> {
  return {
    legacyYears: 17,
    publishedIssues: 66,
    reachArticles: 1300,
  };
}

export async function getMagazineIssues(): Promise<MagazineIssue[]> {
  return [];
}

export async function getCTAData(): Promise<CTAData> {
  return {
    title: "Made by students. Read by everyone.",
    description: "Want to write, design, photograph, or build with us?",
    primaryButtonText: "Learn about NU Sci",
    secondaryButtonText: "Join the team",
    backgroundImageSrc: "/icy.png",
    backgroundImageAlt: "A textured green moss background",
  };
}

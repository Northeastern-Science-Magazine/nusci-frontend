'use server';

import { api, ApiResponse } from './api';
import { Article as ArticleType } from '@/lib/types/types';
import { ArticleCreate } from '@/lib/types/types';
import { Category } from '@/lib/types/types';
import type { ArticleUpdate } from '@/lib/types/types';
import { apiGetUserRoles } from './users';
import { canManageArticles } from '@/lib/helpers/articlePermissions';

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
    id: 'featured-1',
    title: 'Siberian Permafrost',
    description:
      'A photo-led story about the science (and spectacle) behind ice—built to read like a print spread.',
    imageUrl: '/icy.png',
    subtitle: 'Climate Science',
    slug: '/articles/siberian-permafrost',
  },
  {
    id: 'featured-2',
    title: 'Chasing Totality',
    description:
      'A photo-led story about the science (and spectacle) behind eclipses—built to read like a print spread.',
    imageUrl: '/succulent.png',
    subtitle: 'Astronomy',
    slug: '/articles/chasing-totality',
  },
  {
    id: 'recent-1',
    title: 'Urban Heat Islands, Explained',
    description:
      'How cities trap heat and what we can do about it—a deep dive into urban climate science.',
    imageUrl: '/london.png',
    subtitle: 'Science + Society',
    slug: '/articles/urban-heat-islands',
  },
  {
    id: 'recent-2',
    title: 'How Microbiomes Shape Our World',
    description:
      'Exploring the invisible ecosystems that influence everything from our health to our environment.',
    imageUrl: '/moss.png',
    subtitle: 'Research Spotlight',
    slug: '/articles/microbiomes',
  },
  {
    id: 'recent-3',
    title: '5 Questions About CRISPR',
    description: 'A concise guide to understanding gene editing technology.',
    imageUrl: '/icy.png',
    subtitle: 'Quick Read',
    slug: '/articles/crispr-questions',
  },
  {
    id: 'recent-4',
    title: 'Why Science Needs Better Stories',
    description:
      'How narrative can bridge the gap between research and public understanding.',
    imageUrl: '/eclipse-image.png',
    subtitle: 'Opinion',
    slug: '/articles/science-stories',
  },
  {
    id: 'recent-5',
    title: 'Designing an Issue Cover',
    description: 'A look into the creative process behind our magazine design.',
    imageUrl: '/logo.png',
    subtitle: 'Behind the Scenes',
    slug: '/articles/designing-covers',
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

const HARDCODED_MAGAZINES: MagazineIssue[] = [
  {
    id: 'issue-60',
    issueNumber: 60,
    thumbnailUrl:
      'https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue60.png',
    title: 'Issue 60',
    date: '2024',
  },
  {
    id: 'issue-59',
    issueNumber: 59,
    thumbnailUrl:
      'https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue59.png',
    title: 'Issue 59',
    date: '2024',
  },
  {
    id: 'issue-58',
    issueNumber: 5,
    thumbnailUrl:
      'https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue58.png',
    title: 'Issue 58',
    date: '2024',
  },
  {
    id: 'issue-57',
    issueNumber: 57,
    thumbnailUrl:
      'https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue57.png',
    title: 'Issue 57',
    date: '2024',
  },
  {
    id: 'issue-56',
    issueNumber: 56,
    thumbnailUrl:
      'https://northeasternsciencemagazine.github.io/nusci-issuu/thumbnails/issue56.png',
    title: 'Issue 56',
    date: '2023',
  },
];

// Extract the first image URL from nested ArticleContent (paragraphs -> segments)
function extractFirstImageUrl(
  articleContent: ArticleType['articleContent'],
): string | undefined {
  for (const paragraph of articleContent || []) {
    if (!paragraph) continue;
    const imageSeg = paragraph.find((seg) => seg.contentType === 'image');
    if (imageSeg?.content) return imageSeg.content;
  }
  return undefined;
}

// Extract description from first paragraph (concatenate segment text).
// Works for both "text"/"link" and "body_paragraph" style contentTypes.
function extractDescription(
  articleContent: ArticleType['articleContent'],
): string {
  if (!articleContent || articleContent.length === 0) return '';

  const firstParagraph = articleContent.find(
    (paragraph) => paragraph && paragraph.length > 0,
  );
  if (!firstParagraph) return '';

  // Prefer body_paragraph segments if present; otherwise use all segments
  const bodySegments = firstParagraph.filter(
    (seg) => seg.contentType === 'text',
  );
  const segmentsToUse = bodySegments.length > 0 ? bodySegments : firstParagraph;

  return segmentsToUse.map((seg) => seg.content).join(' ');
}

// Map ArticleType to Article interface
function mapArticleTypeToArticle(articleType: ArticleType): Article {
  const imageUrl = extractFirstImageUrl(articleType.articleContent) || '';
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
      sortBy: 'desc',
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Articles search endpoint failed, using fallback recent articles',
        );
      }
      return FALLBACK_RECENT_ARTICLES.slice(0, limit);
    }

    if (
      Array.isArray(response.data.results) &&
      response.data.results.length > 0
    ) {
      return response.data.results.map(mapArticleTypeToArticle);
    }

    return FALLBACK_RECENT_ARTICLES.slice(0, limit);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return FALLBACK_RECENT_ARTICLES.slice(0, limit);
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const response = await api<ArticleType[]>(
      'GET',
      `/articles/search?limit=2&featured=true&sort=date&order=desc`,
    );

    if (
      !response.ok ||
      !Array.isArray(response.data) ||
      response.data.length === 0
    ) {
      console.warn(
        'Featured articles search endpoint failed, using fallback featured articles',
      );
      return FALLBACK_FEATURED_ARTICLES;
    }

    // Map backend ArticleType[] to frontend Article[], deriving description from first paragraph
    return response.data.map(mapArticleTypeToArticle);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
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
  sortBy?: 'asc' | 'desc';
}

export interface ArticleSearchResponse {
  results: ArticleType[];
  total: number;
}

export async function searchArticles(
  request: ArticleSearchRequest,
): Promise<ApiResponse<ArticleSearchResponse>> {
  return api<ArticleSearchResponse>('POST', '/articles/search', request);
}

export async function getArticleBySlug(
  slug: string,
): Promise<ApiResponse<ArticleType>> {
  return api<ArticleType>('GET', `/articles/slug/${slug}`);
}

export async function createArticle(articleData: ArticleCreate) {
  return api<ArticleCreate>('POST', '/articles/create', articleData);
}

/**
 * Saves changed article fields through separate update endpoints.
 * Reports partial saves if a later request fails.
 */
export async function updateArticle(
  slug: string,
  changes: ArticleUpdate,
): Promise<ApiResponse<null>> {
  const rolesResult = await apiGetUserRoles();

  if (!rolesResult.ok) {
    return { ok: false, error: rolesResult.error };
  }

  if (!canManageArticles(rolesResult.data.roles)) {
    return {
      ok: false,
      error: 'You do not have permission to edit articles.',
    };
  }

  const currentResult = await getArticleBySlug(slug);

  if (!currentResult.ok) {
    return {
      ok: false,
      error: `Unable to load the saved article: ${currentResult.error}`,
    };
  }

  const current = currentResult.data;
  const encodedSlug = encodeURIComponent(slug);

  const normalizeSources = (sources: ArticleUpdate['sources']) =>
    sources
      .map((source) => ({
        text: (source.text ?? '').trim(),
        href: (source.href ?? '').trim(),
      }))
      .filter((source) => source.text || source.href);

  const sameCategories =
    JSON.stringify([...changes.categories].sort()) ===
    JSON.stringify([...(current.categories ?? [])].sort());

  const sameSources =
    JSON.stringify(normalizeSources(changes.sources)) ===
    JSON.stringify(normalizeSources(current.sources ?? []));

  const sameAuthors =
    JSON.stringify(changes.authors) ===
    JSON.stringify((current.authors ?? []).map((author) => author.email));

  const updates = [
    {
      label: 'issue number',
      changed: (changes.issueNumber ?? null) !== (current.issueNumber ?? null),

      // TODO(BACKEND-339): Proposed endpoint and payload.
      // Confirm with Kalina when issue-number updating is implemented.
      endpoint: `/articles/issue-number/${encodedSlug}`,
      body: { issueNumber: changes.issueNumber },
    },
    {
      label: 'categories',
      changed: !sameCategories,

      // TODO(BACKEND-339): Proposed endpoint and payload.
      // Confirm with Kalina when category updating is implemented.
      endpoint: `/articles/categories/${encodedSlug}`,
      body: { categories: changes.categories },
    },
    {
      label: 'sources',
      changed: !sameSources,

      // TODO(BACKEND-339): Proposed endpoint and payload.
      // Confirm with Kalina when source updating is implemented.
      endpoint: `/articles/sources/${encodedSlug}`,
      body: { sources: changes.sources },
    },
    {
      label: 'title',
      changed: changes.title !== current.title,
      endpoint: `/articles/title/${encodedSlug}`,
      body: { title: changes.title },
    },
    {
      label: 'content',
      changed:
        JSON.stringify(changes.articleContent) !==
        JSON.stringify(current.articleContent ?? []),
      endpoint: `/articles/content/${encodedSlug}`,
      body: { articleContent: changes.articleContent },
    },
    {
      label: 'authors',
      changed: !sameAuthors,
      endpoint: `/articles/authors/${encodedSlug}`,
      body: { authors: changes.authors },
    },
  ];

  const saved: string[] = [];

  // Try pending endpoints first when their fields changed.
  // Stop on the first failure and retain the edits in the form.
  for (const update of updates) {
    if (!update.changed) continue;

    const result = await api<unknown>('PATCH', update.endpoint, update.body);

    if (!result.ok) {
      const previousUpdates = saved.length
        ? `Already saved: ${saved.join(', ')}. `
        : '';

      return {
        ok: false,
        error:
          `${previousUpdates}Could not confirm the ${update.label} update. ` +
          `${result.error || 'Request failed.'} ` +
          'Your edits are still in the form. Check the saved article before retrying.',
      };
    }

    saved.push(update.label);
  }

  return { ok: true, data: null };
}

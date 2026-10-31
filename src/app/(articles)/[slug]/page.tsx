import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/api/articles';
import { ArticleTemplate } from '@/design-system/components/ArticleTemplate';
import { isMediaPath } from '@/lib/helpers/media';
import Link from 'next/link';
import { apiGetUserRoles } from '@/lib/api/users';
import { canManageArticles } from '@/lib/helpers/articlePermissions';
import { Pencil } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Extract the first image URL from nested articleContent (paragraphs -> segments)
function extractFirstImageUrl(
  articleContent: Array<Array<{ contentType: string; content: string }>>,
): string | undefined {
  for (const paragraph of articleContent ?? []) {
    const imageSegment = paragraph?.find(
      (segment) => segment.contentType === 'image',
    );
    if (imageSegment?.content) return imageSegment.content;
  }
  return undefined;
}

/** Backend may return a display string or a populated user document. */
function formatPersonName(person: unknown): string | undefined {
  if (person == null) return undefined;
  if (typeof person === 'string') return person.trim() || undefined;
  if (
    typeof person === 'object' &&
    'firstName' in person &&
    'lastName' in person
  ) {
    const p = person as { firstName?: string; lastName?: string };
    const name = `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim();
    return name || undefined;
  }
  return undefined;
}

// Format date for display
function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);
  if (!result.ok || !result.data) {
    notFound();
  }

  const article = result.data;

  // Only show the edit button to users with article permissions.
  const rolesResult = await apiGetUserRoles();

  const canEdit = rolesResult.ok && canManageArticles(rolesResult.data.roles);

  // Featured image: the first image in the content. Only images uploaded to
  // our S3 bucket, since next/image refuses hosts it isn't configured for
  const firstImageUrl = extractFirstImageUrl(article.articleContent);
  const imageUrl = isMediaPath(firstImageUrl) ? firstImageUrl : undefined;

  // Format publish date (using creationTime as publish date)
  const publishDate = formatDate(article.creationTime);

  // Get first author name (or default if no authors)
  const author =
    article.authors?.length > 0
      ? (formatPersonName(article.authors[0]) ?? 'NU Sci Magazine')
      : 'NU Sci Magazine';

  // Get first editor if available (API may return a user object or string)
  const editor =
    article.editors?.length > 0
      ? formatPersonName(article.editors[0])
      : undefined;

  return (
    <ArticleTemplate
      title={article.title}
      author={author}
      editor={editor}
      categories={article.categories}
      issueNumber={article.issueNumber}
      publishDate={publishDate}
      articleContent={article.articleContent}
      sources={article.sources}
      featuredImage={
        imageUrl
          ? {
              src: imageUrl,
              alt: article.title,
              width: 'w-full',
              ratio: 16 / 9,
              className: 'object-cover',
            }
          : undefined
      }
      imageCaption={undefined}
      editAction={
        canEdit ? (
          <Link
            href={`/internal/article-edit/${encodeURIComponent(article.slug)}`}
            className="inline-flex items-center gap-2 rounded-md bg-maroon px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit article
          </Link>
        ) : undefined
      }
    />
  );
}

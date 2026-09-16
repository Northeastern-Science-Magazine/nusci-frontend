import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api/articles";
import { ArticleTemplate } from "@/design-system/components/ArticleTemplate";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Extract the first image URL from articleContent for featured image
function extractFirstImageUrl(articleContent: Array<{ contentType: string; content: string }>): string | undefined {
  const imageItem = articleContent.find((item) => item.contentType === "image");
  return imageItem?.content;
}

/** Backend may return a display string or a populated user document. */
function formatPersonName(person: unknown): string | undefined {
  if (person == null) return undefined;
  if (typeof person === "string") return person.trim() || undefined;
  if (typeof person === "object" && "firstName" in person && "lastName" in person) {
    const p = person as { firstName?: string; lastName?: string };
    const name = `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim();
    return name || undefined;
  }
  return undefined;
}

// Format date for display
function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);
  if (!result.ok || !result.data) {
    notFound();
  }

  const article = result.data;

  // Extract first image URL for featured image
  // const firstImageUrl = extractFirstImageUrl(article.articleContent);

  // Format publish date (using creationTime as publish date)
  const publishDate = formatDate(article.creationTime);

  // Get first author name (or default if no authors)
  const author = article.authors?.length > 0 ? formatPersonName(article.authors[0]) ?? "NU Sci Magazine" : "NU Sci Magazine";

  // Get first editor if available (API may return a user object or string)
  const editor = article.editors?.length > 0 ? formatPersonName(article.editors[0]) : undefined;

  // Only use image if it actually exists in the content (no placeholder fallback)
  // const imageUrl = firstImageUrl;

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
      // featuredImage={
      //   imageUrl
      //     ? {
      //         src: imageUrl,
      //         alt: article.title,
      //         width: "w-full",
      //       }
      //     : undefined
      // }
      imageCaption={undefined} // TODO: Add image caption if available in article
    />
  );
}

import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api/articles";
import { ArticleTemplate } from "@/design-system/components/ArticleWithImage";
import { ArticleWithoutImage } from "@/design-system/components/ArticleWithoutImage";
import { PhotographyStatus } from "@/lib/types/types";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Extract the first image URL from articleContent for featured image
function extractFirstImageUrl(articleContent: Array<{ contentType: string; content: string }>): string | undefined {
  const imageItem = articleContent.find((item) => item.contentType === "image");
  return imageItem?.content;
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
  console.log(slug);
  const result = await getArticleBySlug(slug);
  console.log(result);
  if (!result.ok || !result.data) {
    notFound();
  }

  const article = result.data;

  // Extract first image URL for featured image
  const firstImageUrl = extractFirstImageUrl(article.articleContent);

  // Format publish date (using creationTime as publish date)
  const publishDate = formatDate(article.creationTime);

  // Get first author (or "Unknown" if no authors)
  console.log(article);
  const author = article.authors?.length > 0 ? article.authors[0] : "NU Sci Magazine";

  // Get first editor if available
  const editor = article.editors?.length > 0 ? article.editors[0] : undefined;

  // Format issue number
  const issueNumber = `Issue ${article.issueNumber}`;

  // Check if article has an image (photographyStatus !== NoPhoto)
  const hasImage = article.photographyStatus !== PhotographyStatus.NoPhoto;

  // Common props for both components
  const commonProps = {
    title: article.title,
    author,
    editor,
    categories: article.categories,
    //issueNumber, //issue number later when we can clean data and figure out where each one is
    publishDate,
    articleContent: article.articleContent,
    sources: article.sources,
  };

  if (hasImage) {
    // Render ArticleWithImage
    // Use first image from content if available, otherwise use placeholder
    const imageUrl = firstImageUrl || "/succulent.png";

    return (
      <ArticleTemplate
        {...commonProps}
        featuredImage={{
          src: imageUrl,
          alt: article.title,
          width: "w-full",
        }}
        imageCaption={undefined} // TODO: Add image caption if available in article
      />
    );
  } else {
    // Render ArticleWithoutImage
    return <ArticleWithoutImage {...commonProps} />;
  }
}

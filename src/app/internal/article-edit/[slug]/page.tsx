import { notFound } from 'next/navigation';

import { getArticleBySlug } from '@/lib/api/articles';
import { apiGetBasicUserList } from '@/lib/api/users';
import { requireArticlePermission } from '@/lib/helpers/articlePermissions';

import ArticleEditForm from './ArticleEditForm';

type ArticleEditPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Loads an existing article and author options for the editing form.
 * Requires the same permissions as article submission.
 */
export default async function ArticleEditPage({
  params,
}: ArticleEditPageProps) {
  // Check access before fetching the article or user list.
  await requireArticlePermission();

  const { slug } = await params;

  // Load independent requests together.
  const [articleResult, usersResult] = await Promise.all([
    getArticleBySlug(slug),
    apiGetBasicUserList(),
  ]);

  if (!articleResult.ok) {
    return <p role="alert">Unable to load article: {articleResult.error}</p>;
  }

  if (!articleResult.data) {
    notFound();
  }

  if (!usersResult.ok) {
    return (
      <p role="alert">Unable to load author options: {usersResult.error}</p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <h1 className="text-2xl font-bold">Edit Article</h1>

      <ArticleEditForm
        key={articleResult.data.slug}
        article={articleResult.data}
        basicUsers={usersResult.data}
      />
    </div>
  );
}

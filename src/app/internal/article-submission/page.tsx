import { apiGetBasicUserList } from '@/lib/api/users';
import { requireArticlePermission } from '@/lib/helpers/articlePermissions';
import ArticleSubmissionForm from './ArticleSubmissionForm';

export default async function ArticleSubmissionPage() {
  // Use the same page access check for article creation and editing.
  await requireArticlePermission();

  const result = await apiGetBasicUserList();
  const basicUsers = result.ok && result.data ? result.data : [];

  return (
    <ArticleSubmissionForm basicUsers={basicUsers} defaultAuthorEmails={[]} />
  );
}

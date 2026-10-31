import { apiGetBasicUserList } from '@/lib/api/users';
import { apiGetAllIssueNumbers } from '@/lib/api/issues';
import { requireArticlePermission } from '@/lib/helpers/articlePermissions';
import ArticleSubmissionForm from './ArticleSubmissionForm';

export default async function ArticleSubmissionPage() {
  // Use the same page access check for article creation and editing.
  await requireArticlePermission();

  const [res, issuesRes] = await Promise.all([
    apiGetBasicUserList(),
    apiGetAllIssueNumbers(),
  ]);
  const basicUsers = res.ok && res.data ? res.data : [];
  const issueNumbers = issuesRes.ok ? issuesRes.data : [];

  return (
    <ArticleSubmissionForm
      basicUsers={basicUsers}
      defaultAuthorEmails={[]}
      issueNumbers={issueNumbers}
    />
  );
}

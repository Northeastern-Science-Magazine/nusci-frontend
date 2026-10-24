import { apiGetBasicUserList } from '@/lib/api/users';
import { apiGetAllIssueNumbers } from '@/lib/api/issues';
import ArticleSubmissionForm from './ArticleSubmissionForm';

export default async function ArticleSubmissionPage() {
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

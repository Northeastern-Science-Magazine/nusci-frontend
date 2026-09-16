import { apiGetBasicUserList } from "@/lib/api/users";
import ArticleSubmissionForm from "./ArticleSubmissionForm";

export default async function ArticleSubmissionPage() {
  const res = await apiGetBasicUserList();
  const basicUsers = res.ok && res.data ? res.data : [];

  return (
    <ArticleSubmissionForm basicUsers={basicUsers} defaultAuthorEmails={[]} />
  );
}

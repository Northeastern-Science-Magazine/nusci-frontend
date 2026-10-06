import { notFound } from 'next/navigation';
import { apiGetMyProfile } from '@/lib/api/users';
import { apiGetAllIssues } from '@/lib/api/issues';
import { Roles } from '@/lib/types/types';
import IssueManager from './IssueManager';

export default async function IssuesPage() {
  const profile = await apiGetMyProfile();
  if (!profile.ok || !profile.data.roles.includes(Roles.Admin)) {
    notFound();
  }

  const response = await apiGetAllIssues();

  return (
    <IssueManager
      initialIssues={response.ok ? response.data : []}
      loadError={response.ok ? null : response.error}
    />
  );
}

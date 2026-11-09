import { notFound } from 'next/navigation';
import { apiGetMyProfile, apiGetUserRoleList } from '@/lib/api/users';
import { Roles } from '@/lib/types/types';
import RolesManager from './RolesManager';

export default async function RolesPage() {
  const profile = await apiGetMyProfile();
  if (!profile.ok || !profile.data.roles.includes(Roles.Admin)) {
    notFound();
  }

  const response = await apiGetUserRoleList();

  return (
    <RolesManager
      initialUsers={response.ok ? response.data : []}
      loadError={response.ok ? null : response.error}
      myEmail={profile.data.email}
    />
  );
}

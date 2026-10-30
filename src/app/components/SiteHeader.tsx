import { Header } from '@/design-system/components/Header';
import { InternalHeader } from '@/design-system/components/InternalHeader';
import { getUserRoles } from '@/lib/helpers/auth';
import { getMyProfile } from '@/lib/api/users';

/**
 * Renders the InternalHeader when the user is logged in
 * (middleware resolved at least one role from the token cookie),
 * otherwise the public Header.
 */
export default async function SiteHeader() {
  const roles = await getUserRoles();

  if (roles.length === 0) {
    return <Header />;
  }

  const profile = await getMyProfile();
  const emailPrefix = profile.email.split('@')[0];

  const userProfile = {
    name: profile.name,
    avatar: profile.avatarUrl,
    role: profile.roles[0],
  };

  return <InternalHeader userProfile={userProfile} emailPrefix={emailPrefix} />;
}

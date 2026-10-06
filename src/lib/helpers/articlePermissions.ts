import { redirect } from 'next/navigation';
import { apiGetUserRoles } from '@/lib/api/users';
import { Roles } from '@/lib/types/types';

// Admins and Editors currently have Create Article links in the dashboard.

/**
 * Checks whether the user's roles allow article creation and editing.
 */
export function canManageArticles(roles: readonly string[]): boolean {
  return roles.some(
    (role) => role === Roles.Admin || role === Roles.Editor,
  );
}

/**
 * Redirects users who are not signed in or lack article permissions.
 * Used by the article submission and editing pages.
 */
export async function requireArticlePermission(): Promise<void> {
  const result = await apiGetUserRoles();

  if (!result.ok || !result.data.roles.length) {
    redirect('/login');
  }

  if (!canManageArticles(result.data.roles)) {
    redirect('/internal');
  }
}
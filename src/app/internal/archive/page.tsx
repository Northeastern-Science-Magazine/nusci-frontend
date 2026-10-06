import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';
import { getUserRoles } from '@/lib/helpers/auth';
import { apiGetArchivedIssues } from '@/lib/api/archive';
import { Roles } from '@/lib/types/types';
import ArchiveManager from './ArchiveManager';

const ALLOWED_ROLES: string[] = [Roles.Admin, Roles.Editor];

export default async function ArchivePage() {
  const roles = await getUserRoles();

  if (!roles.some((role) => ALLOWED_ROLES.includes(role))) {
    return (
      <Box className="max-w-6xl mx-auto px-4 laptop:px-8 py-16">
        <Text style="regular" size={18} color="black">
          Only admins and editors can manage the magazine archive.
        </Text>
      </Box>
    );
  }

  const response = await apiGetArchivedIssues();

  return (
    <ArchiveManager
      issues={response.ok ? response.data : []}
      loadError={response.ok ? null : response.error}
    />
  );
}

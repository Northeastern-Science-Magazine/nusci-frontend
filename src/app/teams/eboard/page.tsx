import { Box } from '@/design-system/primitives/Box/Box';
import Text from '@/design-system/primitives/Text/Text';
import { AboutUsHero } from '@/app/teams/components/AboutUsHero';
import { getTeamMembersByRole } from '@/lib/api/users';
import { Roles } from '@/lib/types/types';
import TeamTabs from './TeamTabs';

export default async function EboardPage() {
  const [eboard, editors] = await Promise.all([
    getTeamMembersByRole(Roles.Admin),
    getTeamMembersByRole(Roles.Editor),
  ]);

  return (
    <Box className="min-h-screen bg-neutral/10">
      <AboutUsHero />

      <Box className="mx-auto max-w-6xl px-6 py-8">
        <Text size={36} style="bold" color="black" className="mb-4">
          Meet our team
        </Text>

        <TeamTabs eboard={eboard} editors={editors} />
      </Box>
    </Box>
  );
}

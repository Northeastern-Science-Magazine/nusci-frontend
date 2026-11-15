import Font from '@/design-system/primitives/Font';
import Card from '@/primitives/Card';
import Text from '@/primitives/Text';
import { Roles } from '@/lib/types/types';
import { notFound } from 'next/navigation';
import DashboardCard from './components/dashboardCard';
import { OverlayMedia, Overlay } from '@/design-system/components/MediaOverlay';
import Image from '@/design-system/primitives/Image';
import Box from '@/design-system/primitives/Box';
import { getMyProfile } from '@/lib/api/users';

interface PublicProfilePageProps {
  params: Promise<{ emailPrefix: string }>;
}

// every dashboard card, shown if the user has any of its roles
const DASHBOARD_CARDS: { text: string; href: string; roles: Roles[] }[] = [
  { text: 'Invite User', href: '/internal/invite-user', roles: [Roles.Admin] },
  {
    text: 'Create an Article',
    href: '/internal/article-submission',
    roles: [Roles.Admin, Roles.Editor],
  },
  { text: 'Manage Issues', href: '/internal/issues', roles: [Roles.Admin] },
  {
    text: 'Magazine Archive',
    href: '/internal/archive',
    roles: [Roles.Admin],
  },
  {
    text: 'Pitch Recipients',
    href: '/internal/pitch-settings',
    roles: [Roles.Admin],
  },
  {
    text: 'Upload Photos',
    href: '/internal/photoApproval',
    roles: [Roles.Photographer],
  },
];

export default async function DashboardPage({
  params,
}: PublicProfilePageProps) {
  const { emailPrefix } = await params;
  const profile = await getMyProfile();
  const myEmailPrefix = profile.email.split('@')[0];

  if (emailPrefix !== myEmailPrefix) {
    notFound();
  }

  const roles: Roles[] = profile.roles;
  const userName: string = profile.name;

  const cards = DASHBOARD_CARDS.filter((card) =>
    card.roles.some((role) => roles.includes(role)),
  );

  return (
    <OverlayMedia className="relative w-full overflow-hidden">
      <Image
        src="/icy.png"
        alt="A textured green moss background"
        width="w-full"
        height="screen"
        ratio={1920 / 1000}
      />
      <Overlay background="gradient-black">
        <Box className="flex h-full w-full items-center justify-center px-4">
          <Card
            color="white"
            className="flex max-h-[80vh] min-h-[50vh] w-full max-w-6xl flex-col gap-8 overflow-y-auto p-6 shadow-2xl sm:p-8"
          >
            <Card color="gray-light" className="w-full px-6 shadow-lg">
              <Font serif>
                <Text size={30} style="bold">
                  Welcome Back {userName}!
                </Text>
              </Font>
            </Card>

            {cards.length > 0 ? (
              <Box className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                  <DashboardCard
                    key={card.href}
                    text={card.text}
                    href={card.href}
                  />
                ))}
              </Box>
            ) : (
              <Text color="black">
                No dashboard tools are available for your role yet.
              </Text>
            )}
          </Card>
        </Box>
      </Overlay>
    </OverlayMedia>
  );
}

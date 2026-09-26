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
        <Box className="flex h-full w-full items-center justify-center">
          <Card
            color="white"
            className="h-[80vh] w-full max-w-[95vw] shadow-2xl"
          >
            <Card color="gray-light" className="w-full shadow-2xl">
              <Font serif>
                <Text size={30} mx={6} style="bold">
                  Welcome Back {userName}!
                </Text>
              </Font>
            </Card>
            {roles.map((role, index) => {
              if (role == Roles.Admin) {
                return (
                  <Box className="grid grid-cols-4 gap-6" key={index}>
                    <DashboardCard
                      text="Invite User"
                      href="internal/inviteUser"
                    />
                    <DashboardCard
                      text="Approve Submission"
                      href="internal/approvals"
                    />
                    <DashboardCard
                      text="Make An Article"
                      href="internal/article-submission"
                    />
                  </Box>
                );
              } else if (role == Roles.Editor) {
                return (
                  <Box className="grid grid-cols-4 gap-6" key={index}>
                    <DashboardCard
                      text="Approve Submission"
                      href="internal/approvals"
                    />
                    <DashboardCard
                      text="Create an Article"
                      href="internal/article-submission"
                    />
                  </Box>
                );
              } else if (role == Roles.Photographer) {
                return (
                  <DashboardCard
                    text="Upload Photos"
                    href="internal/photoApproval"
                    key={index}
                  />
                );
              }
            })}
          </Card>
        </Box>
      </Overlay>
    </OverlayMedia>
  );
}

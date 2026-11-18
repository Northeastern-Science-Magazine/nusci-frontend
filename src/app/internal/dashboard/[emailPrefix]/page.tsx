import Font from '@/design-system/primitives/Font';
import Text from '@/primitives/Text';
import Badge from '@/design-system/primitives/Badge';
import Divider from '@/design-system/primitives/Divider';
import { IconName } from '@/design-system/primitives/Icon';
import { Roles } from '@/lib/types/types';
import { notFound } from 'next/navigation';
import DashboardCard, { type CardColor } from './components/dashboardCard';
import { OverlayMedia, Overlay } from '@/design-system/components/MediaOverlay';
import Image from '@/design-system/primitives/Image';
import Box from '@/design-system/primitives/Box';
import { getMyProfile } from '@/lib/api/users';

interface PublicProfilePageProps {
  params: Promise<{ emailPrefix: string }>;
}

// every dashboard card, shown if the user has any of its roles
const DASHBOARD_CARDS: {
  text: string;
  description: string;
  href: string;
  roles: Roles[];
  icon: IconName;
  color: CardColor;
}[] = [
  {
    text: 'Create an Article',
    description: 'Draft a new article and assign it to an issue.',
    href: '/internal/article-submission',
    roles: [Roles.Admin, Roles.Editor],
    icon: 'scroll',
    color: 'forest-green',
  },
  {
    text: 'Manage Issues',
    description: 'Create, rename, and review the articles in each issue.',
    href: '/internal/issues',
    roles: [Roles.Admin],
    icon: 'book',
    color: 'coral',
  },
  {
    text: 'Magazine Archive',
    description: 'Upload print issue PDFs to the public archive.',
    href: '/internal/archive',
    roles: [Roles.Admin],
    icon: 'bookmark',
    color: 'purple',
  },
  {
    text: 'Invite User',
    description: 'Send sign-up invites and assign roles to new members.',
    href: '/internal/invite-user',
    roles: [Roles.Admin],
    icon: 'email',
    color: 'aqua',
  },
  {
    text: 'Pitch Recipients',
    description: 'Choose who receives article pitches from the website.',
    href: '/internal/pitch-settings',
    roles: [Roles.Admin],
    icon: 'mails',
    color: 'marigold',
  },
  {
    text: 'Upload Photos',
    description: 'Submit photography for review and publication.',
    href: '/internal/photoApproval',
    roles: [Roles.Photographer],
    icon: 'camera',
    color: 'pink',
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
  const firstName = profile.name.split(' ')[0] || profile.name;

  const cards = DASHBOARD_CARDS.filter((card) =>
    card.roles.some((role) => roles.includes(role)),
  );

  return (
    <Box className="min-h-screen bg-white">
      {/* Hero, same pattern as the About Us hero */}
      <OverlayMedia className="w-full relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            raw
            src="/icy.png"
            alt="Icy pine needles with icicles background"
            width="w-full"
          />
        </div>

        <Overlay background="solid-black" className="relative">
          {/* darker fade behind the text so it stays readable over the photo */}
          <Box className="bg-gradient-to-r from-black/60 via-black/30 to-transparent">
            <Box className="mx-auto w-full max-w-6xl px-6 py-16 drop-shadow-md laptop:py-20">
              <Text
                size={12}
                color="white"
                spacing="xl"
                opacity={90}
                className="uppercase"
              >
                NU Sci Internal Portal
              </Text>
              <Text
                size={60}
                color="white"
                spacing="sm"
                className="mt-4 leading-none max-laptop:text-[48px] max-sm:text-[36px]"
              >
                Welcome back, {firstName}
              </Text>
              <Text
                size={20}
                color="white"
                opacity={95}
                className="mt-4 max-w-2xl font-light max-sm:text-[16px]"
              >
                Everything you need to put the magazine together, in one place.
              </Text>

              {roles.length > 0 && (
                <Box mt={8} className="flex flex-wrap gap-3">
                  {roles.map((role) => (
                    <Badge
                      key={role}
                      rounded="md"
                      color="sage-green"
                      className="px-4 py-2"
                    >
                      <Text
                        size={12}
                        color="black"
                        spacing="lg"
                        className="font-semibold uppercase"
                      >
                        {role}
                      </Text>
                    </Badge>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Overlay>
      </OverlayMedia>

      {/* Tools, styled like the homepage article sections */}
      <Font serif>
        <Box className="mx-auto max-w-6xl px-6 py-16">
          <Box className="flex flex-col items-start justify-between gap-2 laptop:flex-row laptop:items-end">
            <Text size={48} className="tracking-tight">
              Your Tools
            </Text>
            <Text size={14} color="black" className="opacity-60">
              {cards.length} available
            </Text>
          </Box>
          <Divider my={8} />

          {cards.length > 0 ? (
            <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 laptop:grid-cols-3">
              {cards.map((card) => (
                <DashboardCard
                  key={card.href}
                  text={card.text}
                  description={card.description}
                  href={card.href}
                  icon={card.icon}
                  color={card.color}
                />
              ))}
            </Box>
          ) : (
            <Text size={18} color="black" className="font-light opacity-75">
              No dashboard tools are available for your role yet.
            </Text>
          )}
        </Box>
      </Font>
    </Box>
  );
}

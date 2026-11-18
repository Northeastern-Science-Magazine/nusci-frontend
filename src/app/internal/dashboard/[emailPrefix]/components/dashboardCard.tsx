import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';
import Icon, { IconName } from '@/design-system/primitives/Icon';
import Link from '@/design-system/primitives/Link';
import { ChevronRight } from 'lucide-react';

export type CardColor =
  'forest-green' | 'aqua' | 'coral' | 'purple' | 'marigold' | 'pink';

interface DashboardCardProps {
  text: string;
  description: string;
  href: string;
  icon: IconName;
  color: CardColor;
}

/**
 * A dashboard tool tile, styled like the article grid on the homepage.
 */
export default function DashboardCard({
  text,
  description,
  href,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <Link href={href} newWindow={false} className="group block h-full">
      <Box className="flex h-full flex-col border border-t-4 border-black/10 border-t-forest-green bg-white p-6 transition-all duration-200 hover:border-forest-green hover:shadow-lg">
        <Icon icon={icon} size={36} color={color} />
        <Text size={24} color="black" className="mt-4 tracking-tight">
          {text}
        </Text>
        <Text
          size={14}
          color="black"
          className="mt-2 flex-1 font-light leading-relaxed opacity-75"
        >
          {description}
        </Text>
        <span className="mt-6 inline-flex items-center gap-2 self-start border-b-2 border-forest-green/30 pb-1 text-[14px] font-medium text-forest-green transition-all group-hover:border-forest-green">
          Open
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Box>
    </Link>
  );
}

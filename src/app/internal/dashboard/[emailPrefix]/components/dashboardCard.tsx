import NextLink from 'next/link';
import Box from '@/design-system/primitives/Box';
import Text from '@/design-system/primitives/Text';
import Icon, {
  type IconName,
  type IconVariants,
} from '@/design-system/primitives/Icon';

type IconColor = NonNullable<IconVariants['color']>;

/** The icon colours a dashboard card can use */
export type CardColor = Extract<
  IconColor,
  'forest-green' | 'aqua' | 'coral' | 'purple' | 'marigold' | 'pink'
>;

// full class strings so Tailwind keeps them
const CARD_COLOR_CLASSES: Record<CardColor, { frame: string; link: string }> = {
  'forest-green': {
    frame: 'border-t-forest-green hover:border-forest-green',
    link: 'text-forest-green border-forest-green/30 group-hover:border-forest-green',
  },
  aqua: {
    frame: 'border-t-aqua hover:border-aqua',
    link: 'text-aqua border-aqua/30 group-hover:border-aqua',
  },
  coral: {
    frame: 'border-t-coral hover:border-coral',
    link: 'text-coral border-coral/30 group-hover:border-coral',
  },
  purple: {
    frame: 'border-t-purple hover:border-purple',
    link: 'text-purple border-purple/30 group-hover:border-purple',
  },
  marigold: {
    frame: 'border-t-marigold hover:border-marigold',
    link: 'text-marigold border-marigold/30 group-hover:border-marigold',
  },
  pink: {
    frame: 'border-t-pink hover:border-pink',
    link: 'text-pink border-pink/30 group-hover:border-pink',
  },
};

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
  const classes = CARD_COLOR_CLASSES[color];
  return (
    <NextLink href={href} className="group block h-full">
      <Box
        className={`flex h-full flex-col border border-t-4 border-black/10 bg-white p-6 transition-all duration-200 hover:shadow-lg ${classes.frame}`}
      >
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
        <span
          className={`mt-6 inline-flex items-center gap-2 self-start border-b-2 pb-1 text-[14px] font-medium transition-all ${classes.link}`}
        >
          Open
          <Icon
            icon="chevronRight"
            size={16}
            color={color}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </Box>
    </NextLink>
  );
}

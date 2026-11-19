import Card from '@/design-system/primitives/Card';
import Text from '@/design-system/primitives/Text';
import Link from 'next/link';
import Font from '@/design-system/primitives/Font';

interface DashboardCardProps {
  text: string;
  href: string;
}

export default function DashboardCard({ text, href }: DashboardCardProps) {
  return (
    <Font serif>
      <Link href={href} className="block h-full">
        <Card
          color="gray-light"
          animation="scale110Hover"
          className="flex h-32 w-full items-center justify-center px-6 shadow-lg transition-transform"
        >
          <Text
            size={24}
            color="black"
            className="text-center whitespace-normal break-words"
          >
            {text}
          </Text>
        </Card>
      </Link>
    </Font>
  );
}

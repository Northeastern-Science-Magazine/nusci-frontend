import Card from "@/design-system/primitives/Card";
import Text from "@/design-system/primitives/Text";
import Link from "next/link";
import Font from "@/design-system/primitives/Font";

interface DashboardCardProps {
  text: string;
  href: string;
}

export default function DashboardCard({ text, href }: DashboardCardProps) {
  return (
    <Font serif>
      <Link href={href}>
        <Card
          color="gray-light"
          width={256}
          height={128}
          mx={10}
          my={16}
          animation="scale110Hover"
          className="flex items-center justify-center shadow-lg"
        >
          <Text size={24} color = "black" className="text-center whitespace-normal break-words">
            {" "}
            {text}{" "}
          </Text>
        </Card>
      </Link>
    </Font>
  );
}

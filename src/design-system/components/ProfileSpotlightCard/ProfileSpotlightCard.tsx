import Badge from "@/design-system/primitives/Badge";
import Card from "@/design-system/primitives/Card";
import { Flex } from "@/design-system/primitives/Flex";
import Image from "@/design-system/primitives/Image";
import Link from "@/design-system/primitives/Link";
import Text from "@/design-system/primitives/Text";
import { emailToProfileURL } from "@/lib/helpers/utils";

type ProfileSpotlightCardProps = {
  firstName: string;
  lastName: string;
  pronouns: string[];
  graduationYear: number;
  major: string;
  profileImage: string;
  email: string;
};

export default function ProfileSpotlightCard({
  firstName,
  lastName,
  pronouns,
  graduationYear,
  major,
  profileImage,
  email,
}: ProfileSpotlightCardProps) {
  return (
    <Link href={emailToProfileURL(email)} newWindow={false}>
      <Card className="w-[324px] min-h-[500px] hover:border-black transition duration-300 ">
        <Image
          ratio={1 / 1}
          src={profileImage}
          alt={`${firstName} ${lastName} Profile Image`}
          rounded="rounded"
          width="w-[292px]"
        />
        <Text size={24}>
          {firstName} {lastName}
        </Text>
        <Flex className="mb-4" gap={4}>
          <Text size={18}>{pronouns.length > 0 && <p className="text-sm text-gray-500 mt-1">{pronouns.join(" / ")}</p>}</Text>
          <Badge size={12}>Class of {graduationYear}</Badge>
        </Flex>

        <Text size={20}>{major}</Text>
      </Card>
    </Link>
  );
}

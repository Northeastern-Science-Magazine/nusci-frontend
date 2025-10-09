import Badge from "@/design-system/primitives/Badge";
import Box from "@/design-system/primitives/Box";
import Card from "@/design-system/primitives/Card";
import { Flex } from "@/design-system/primitives/Flex";
import Image from "@/design-system/primitives/Image";
import Text from "@/design-system/primitives/Text";

type ProfileSpotlightCardProps = {
  firstName: string;
  lastName: string;
  pronouns: string[];
  graduationYear: number;
  major: string;
  profileImage: string;
  bio: string;
};

export default function ProfileSpotlightCard({
  firstName,
  lastName,
  pronouns,
  graduationYear,
  major,
  profileImage,
  bio,
}: ProfileSpotlightCardProps) {
  return (
    <Card className="w-[324px]">
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
  );
}

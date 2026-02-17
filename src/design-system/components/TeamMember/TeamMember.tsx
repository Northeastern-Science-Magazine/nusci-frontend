import { TeamMemberProps, teamMemberVariants, teamMemberTextSizes, teamMemberAvatarSizes } from "./variants";
import Box from "@/primitives/Box";
import { Avatar } from "@/primitives/Avatar/Avatar";
import Text, { TextProps } from "@/primitives/Text";
import { Badge } from "@/primitives/Badge/Badge";
import Icon from "@/primitives/Icon";
import Link from "@/primitives/Link";

export const TeamMember = (props: TeamMemberProps) => {
  const {
    name,
    pronouns,
    role,
    bio,
    graduationYear,
    major,
    email,
    avatarUrl,
    profileBaseUrl = "/profile",
    size,
    children,
    ...variantProps
  } = props;

  const textSizes = teamMemberTextSizes[size ?? "md"];
  const avatarSize = teamMemberAvatarSizes[size ?? "md"];

  return (
    <Link href={``} newWindow={false} className={teamMemberVariants(props)}>
      {/*<Link href={`${profileBaseUrl}/${email.split("@")[0]}`} newWindow={false} className={teamMemberVariants(props)}>*/}
      <Box className="flex items-center gap-4">
        <Avatar
          src={avatarUrl}
          alt={`${name}'s avatar`}
          fallback={name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
          size={avatarSize}
        />
        <Box className="flex flex-col gap-1 items-start">
          <Box className="flex items-center gap-2 flex-wrap">
            <Text style="bold" size={textSizes.name} className="text-inherit">
              {name}
            </Text>
            <Text size={textSizes.pronouns} className="text-inherit">
              ({pronouns})
            </Text>
          </Box>
          {role && (
            <Badge color="aqua" variant="default" rounded="sm">
              {role}
            </Badge>
          )}
        </Box>
      </Box>

      <Box className="flex flex-wrap gap-2">
        <Badge color="sage-green" variant="outline" rounded="sm">
          Class of {graduationYear}
        </Badge>
        <Badge color="forest-green" variant="outline" rounded="sm">
          {major}
        </Badge>
      </Box>

      {bio && (
        <Text size={textSizes.bio} className="leading-relaxed text-inherit">
          {bio}
        </Text>
      )}

      {children}

      <Box className="mt-auto"> </Box>

      {email && (
        <Box className="flex items-center gap-2 pt-2 border-t border-black/20">
          <Icon icon="email" size="sm" color="black" />
          <Text size={textSizes.email as TextProps["size"]} className="text-inherit">
            {email}
          </Text>
        </Box>
      )}
    </Link>
  );
};

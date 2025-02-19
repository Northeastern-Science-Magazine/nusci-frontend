import { Avatar } from "radix-ui";

export const AvatarCustom = () => {
    return (
    <Avatar.Root>
		<Avatar.Image />
		<Avatar.Fallback />
	</Avatar.Root>
    );
};

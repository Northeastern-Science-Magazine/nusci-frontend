import { Avatar } from "radix-ui";
import { AvatarProps } from "./AvatarProps";

export const AvatarCustom = (props: AvatarProps) => {
    return (
    <Avatar.Root>
		<Avatar.Image src={props.src} alt={props.alt}/>
		<Avatar.Fallback>{props.fallback}</Avatar.Fallback>
	</Avatar.Root>
    );
};

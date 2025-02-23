import { Avatar } from "radix-ui";
import { AvatarProps } from "./AvatarProps";

export const AvatarCustom = (props: AvatarProps) => {
    return (
    <Avatar.Root>
		<Avatar.Image src={props.src} alt={props.alt ?? "an avatar"}/>
		<Avatar.Fallback>{props.fallback.length == 0 ? "NA" : 
        props.fallback.length <= 2 ? 
        props.fallback : props.fallback.substring(0, 2)}</Avatar.Fallback>
	</Avatar.Root>
    );
};

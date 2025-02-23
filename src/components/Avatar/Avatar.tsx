import { Avatar } from "radix-ui";
import { AvatarProps } from "./AvatarProps";

export const AvatarCustom = (props: AvatarProps) => {
    const alts = !props.alt ? "an avatar" : "an avatar";
    return (
    <Avatar.Root>
		<Avatar.Image src={props.src} alt={alts}/>
		<Avatar.Fallback>{props.fallback.length == 0 ? "NA" : 
        props.fallback.length <= 2 ? 
        props.fallback : props.fallback.substring(0, 2)}</Avatar.Fallback>
	</Avatar.Root>
    );
};

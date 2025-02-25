import { Avatar } from "radix-ui";
import { AvatarProps } from "./AvatarProps";
import { avatarVariants } from "./variants";

/**
 * Avatar Component
 *
 * @param { AvatarProps } props
 * @returns Avatar Component
 */
export const AvatarCustom = (props: AvatarProps) => {
    return (
    <Avatar.Root>
		<Avatar.Image className={avatarVariants(props)} src={props.src} alt={props.alt ?? "an avatar"}/>
		<Avatar.Fallback className={avatarVariants(props)}>{props.fallback.length == 0 ? "NA" : 
        props.fallback.length <= 2 ? 
        props.fallback : props.fallback.substring(0, 2)}</Avatar.Fallback>
	</Avatar.Root>
    );
};

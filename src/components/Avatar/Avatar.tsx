import { Avatar as RadixAvatar } from "radix-ui";
import { avatarVariants, AvatarProps } from "./variants";

/**
 * Avatar Component
 *
 * @param { AvatarProps } props
 * @returns Avatar Component
 */
export const Avatar = (props: AvatarProps) => {
    return (
    <RadixAvatar.Root>
		<RadixAvatar.Image className={avatarVariants(props)} src={props.src} alt={props.alt ?? "an avatar"}/>
		<RadixAvatar.Fallback className={avatarVariants(props)}>{props.fallback.length == 0 ? "NA" : 
        props.fallback.length <= 2 ? 
        props.fallback : props.fallback.substring(0, 2)}</RadixAvatar.Fallback>
	</RadixAvatar.Root>
    );
};

import { Avatar as RadixAvatar } from "radix-ui";
import { avatarVariants, AvatarProps } from "./variants";

/**
 * Avatar Component
 *
 * @param { AvatarProps } props
 * @returns Avatar Component
 */
export const Avatar = ({ size, src, alt, fallback, onClick }: AvatarProps) => {
  return (
    <RadixAvatar.Root onClick={onClick}>
      <RadixAvatar.Image className={avatarVariants({ size })} src={src} alt={alt ?? "an avatar"} />
      <RadixAvatar.Fallback className={avatarVariants({ size })}>
        {fallback.length == 0 ? "NA" : fallback.length <= 2 ? fallback : fallback.substring(0, 2)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

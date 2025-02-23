export interface AvatarProps {
    src?: string;
    alt?: string; // add default alt text when not given
    fallback: string; // validate if it's 1-2 characters long in prop
}
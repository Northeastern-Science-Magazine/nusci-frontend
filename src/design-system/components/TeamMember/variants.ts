import { BoxProps } from "@/primitives/Box/variants";
import { AvatarProps } from "@/primitives/Avatar/variants";
import { tv, type VariantProps } from "tailwind-variants";

export const teamMemberVariants = tv({
  base: "flex flex-col gap-4 h-full transition-colors",
  variants: {
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    rounded: {
      rounded: "rounded-2xl overflow-hidden",
      none: "",
    },
    shadow: {
      shadow: "shadow-md",
      none: "",
    },
    border: {
      bordered: "border-2 border-white hover:border-black/20",
      none: "",
    },
    color: {
      white: "bg-white text-black",
      black: "bg-black text-white",
      aqua: "bg-aqua text-white",
      "aqua-light": "bg-aqua-light text-black",
      "forest-green": "bg-forest-green text-white",
      "sage-green": "bg-sage-green text-black",
      neutral: "bg-neutral text-black",
      purple: "bg-purple text-white",
      pink: "bg-pink text-black",
      maroon: "bg-maroon text-white",
      coral: "bg-coral text-black",
      marigold: "bg-marigold text-black",
      red: "bg-red text-white",
      border: "bg-border text-white",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "rounded",
    shadow: "shadow",
    border: "bordered",
    color: "white",
  },
});

export const teamMemberTextSizes = {
  sm: { name: 16, pronouns: 12, bio: 12, email: 10, badges: 12 },
  md: { name: 20, pronouns: 14, bio: 14, email: 12, badges: 14 },
  lg: { name: 24, pronouns: 16, bio: 16, email: 14, badges: 16 },
} as const;

export const teamMemberAvatarSizes = {
  sm: "md",
  md: "lg",
  lg: "xl",
} as const;

export type TeamMemberSize = keyof typeof teamMemberTextSizes;

export type TeamMemberVariants = VariantProps<typeof teamMemberVariants>;

export interface TeamMemberProps extends TeamMemberVariants {
  name: string;
  pronouns: string;
  role?: string;
  bio: string;
  graduationYear: number;
  major: string;
  email: string;
  avatarUrl: string;
  profileBaseUrl?: string;
  children?: React.ReactNode;
}

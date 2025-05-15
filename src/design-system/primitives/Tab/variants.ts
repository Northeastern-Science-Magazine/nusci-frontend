import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const tabVariants = tv({
  base: "",
});

export interface TabProps extends VariantProps<typeof tabVariants> {
    className?: string;
    triggers: string[];
    children: React.ReactNode[];
}

import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  base: "relative h-6 w-11 cursor-default rounded-full bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "data-[state=checked]:bg-neutral-900",
      color: "data-[state=checked]:bg-primary-500",
      success: "data-[state=checked]:bg-green-500",
      danger: "data-[state=checked]:bg-red-500",
    },
    size: {
      sm: "h-5 w-9",
      md: "h-6 w-11",
      lg: "h-7 w-13",
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export type ToggleVariants = VariantProps<typeof toggleVariants>;

export interface ToggleProps extends ToggleVariants {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  label?: string;
}

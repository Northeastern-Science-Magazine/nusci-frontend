import { tv, type VariantProps } from "tailwind-variants";

/** Define RadioButton Variants
 * applies dynamic styling for checked/unchecked state using Radix data-state
*/
export const radioButtonVariants = tv({
  base: "border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    color: {
      black: "border-black data-[state=checked]:bg-black focus:ring-black",
      white: "border-white data-[state=checked]:bg-white focus:ring-white",
      red: "border-red-500 data-[state=checked]:bg-red-500 focus:ring-red-500",
      aqua: "border-aqua data-[state=checked]:bg-aqua focus:ring-aqua",
      "aqua-light": "border-aqua-light data-[state=checked]:bg-aqua-light focus:ring-aqua-light",
      "forest-green": "border-forest-green data-[state=checked]:bg-forest-green focus:ring-forest-green",
      "sage-green": "border-sage-green data-[state=checked]:bg-sage-green focus:ring-sage-green",
      border: "border-border data-[state=checked]:bg-border focus:ring-border",
      neutral: "border-neutral data-[state=checked]:bg-neutral focus:ring-neutral",
      purple: "border-purple data-[state=checked]:bg-purple focus:ring-purple",
      pink: "border-pink data-[state=checked]:bg-pink focus:ring-pink",
      maroon: "border-maroon data-[state=checked]:bg-maroon focus:ring-maroon",
      coral: "border-coral data-[state=checked]:bg-coral focus:ring-coral",
      marigold: "border-marigold data-[state=checked]:bg-marigold focus:ring-marigold",
    },
  },
  defaultVariants: {
    color: "black",
  },
});

/** Create the typing for Button Variant Props */
export type RadioButtonVariants = VariantProps<typeof radioButtonVariants>;

/** props for RadioButton component
 * options: array of selectable radio options
 * name: group name for form compatibility
 * defaultValue: pre-selected value
 * onChange: callback when selection changes
 * className: optional additional classes
 * color: styling variant
 */
export interface RadioButtonProps extends RadioButtonVariants {
  options: { label: string; value: string }[];
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}
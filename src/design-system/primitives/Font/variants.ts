import { tv, type VariantProps } from "tailwind-variants";

/** Define Font Variants using Tailwind Variant Definitions */
export const fontVariants = tv({
  variants: {
    sans: {
      true: "font-sans",
      false: ""
    },
    serif: {
      true: "font-serif",
      false: ""
    },
    mono: {
      true: "font-mono",
      false: ""
    },
    arial: {
      true: "font-[Arial, sans-serif]",
      false: ""
    },
    georgia: {
      true: "font-[Georgia, serif]",
      false: ""
    },
    poppins: {
      true: "font-[Poppins, sans-serif]",
      false: ""
    },
    verdana: {
      true: "font-[Verdana,sans-serif]",
      false: ""
    },
    tahoma: {
      true: "font-[Tahoma,sans-serif]",
      false: ""
    },
    courier: {
      true: "font-[Courier,monospace]",
      false: ""
    },
    "lucida-console": {
      true: "font-[\"Lucida Console\",monospace]",
      false: ""
    },
    futura: {
      true: "font-[Futura,sans-serif]",
      false: ""
    },
  },
  defaultVariants: {
    sans: true,
  },
});

export interface FontProps extends VariantProps<typeof fontVariants> {
  children: React.ReactNode
}

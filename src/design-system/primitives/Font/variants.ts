import { tv, type VariantProps } from "tailwind-variants";

/** Define Font Variants using Tailwind Variant Definitions */
export const fontVariants = tv({
  variants: {
    fontName: {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
      arial: "font-[Arial]",
      helvetica: 'font-[Helvetica]',
      timesnewroman: 'font-[Times_New_Roman]',
      georgia: 'font-[Georgia]',
      poppins: 'font-[Poppins]'
    },
  },
  defaultVariants: {
    fontName: "sans",
  },
});

export interface FontProps extends VariantProps<typeof fontVariants> {
  children: React.ReactNode
}

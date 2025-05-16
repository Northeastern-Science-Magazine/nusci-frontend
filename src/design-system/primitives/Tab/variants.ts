import { tv, type VariantProps } from "tailwind-variants";

/** Define Avatar Variants using Tailwind Variant Definitions */
export const tabRootVariants = tv({
  base: "flex w-[300px] flex-col shadow-[0_2px_10px] shadow-blackA2",
});

export const tabListVariants = tv({
  base: "flex shrink-0",
});

export const tabTriggerVariants = tv({
  base: "flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black",
});

export const tabContentVariants = tv({
  base: "grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black",
});

export interface TabProps extends VariantProps<typeof tabRootVariants> {
  className?: string;
  triggers: React.ReactNode[];
  children: React.ReactNode[];
}

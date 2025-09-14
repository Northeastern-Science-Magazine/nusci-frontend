import { tv, type VariantProps } from "tailwind-variants";
import { ReactElement } from "react";

/** Define Tab Variants using Tailwind Variant Definitions */
export const tabRootVariants = tv({
  base: "flex w-[300px] flex-col border-2 first:rounded-tl-md last:rounded-tr-md rounded-b-md",
});

export type TabRootVariants = VariantProps<typeof tabRootVariants>;

export interface TabProps extends TabRootVariants {
  className?: string;
  children: React.ReactNode[];
  defaultValue?: string;
}

export const tabListVariants = tv({
  base: "flex shrink-0",
});

export type TabListVariants = VariantProps<typeof tabListVariants>;

export interface TabListProps extends TabListVariants {
  className?: string;
  children: ReactElement<TabTriggerProps> | ReactElement<TabTriggerProps>[];
}

export const tabTriggerVariants = tv({
  base: "flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current",
});

export type TabTriggerVariants = VariantProps<typeof tabTriggerVariants>;

export interface TabTriggerProps extends TabTriggerVariants {
  className?: string;
  children: React.ReactNode;
  value: string;
}

export const tabContentVariants = tv({
  base: "grow rounded-b-md bg-white p-5 outline-none",
});

export type TabContentVariants = VariantProps<typeof tabContentVariants>;

export interface TabContentProps extends TabContentVariants {
  className?: string;
  children: React.ReactNode;
  value: string;
}

import { Tabs as RadixTab } from "radix-ui";
import {
  tabRootVariants,
  tabTriggerVariants,
  tabListVariants,
  tabContentVariants,
  TabProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
} from "./variants";

/**
 * Tab Component
 *
 * @param { TabProps } props
 * @returns Tab Component
 */

export function TabList({ children, ...variantProps }: TabListProps) {
  return (
    <RadixTab.List className={`${tabListVariants(variantProps)}`}>
      {children}
    </RadixTab.List>
  );
}

export function TabTrigger({
  className,
  children,
  value,
  ...variantProps
}: TabTriggerProps) {
  return (
    <RadixTab.Trigger
      value={value}
      className={`${tabTriggerVariants(variantProps)}`}
    >
      {children}
    </RadixTab.Trigger>
  );
}

export function TabContent({
  className,
  children,
  value,
  ...variantProps
}: TabContentProps) {
  return (
    <RadixTab.Content
      value={value}
      className={`${tabContentVariants(variantProps)}`}
    >
      <p>{children}</p>
    </RadixTab.Content>
  );
}

export const Tab = ({
  className,
  children,
  defaultValue,
  ...variantProps
}: TabProps) => {
  return (
    <RadixTab.Root
      className={`${tabRootVariants(variantProps)} ${className}`}
      defaultValue={defaultValue}
    >
      {children}
    </RadixTab.Root>
  );
};

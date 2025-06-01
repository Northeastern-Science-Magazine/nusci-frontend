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

export function TabList({ triggers, ...variantProps }: TabListProps) {
  return (
    <RadixTab.List className={`${tabListVariants(variantProps)}`}>
      {triggers.map((trigger, index) => (
        <TabTrigger trigger={trigger} index={index} />
      ))}
    </RadixTab.List>
  );
}

export function TabTrigger({
  className,
  trigger,
  index,
  ...variantProps
}: TabTriggerProps) {
  return (
    <RadixTab.Trigger
      value={"tab" + index}
      className={`${tabTriggerVariants(variantProps)}`}
    >
      {trigger}
    </RadixTab.Trigger>
  );
}

export function TabContent({
  className,
  content,
  value,
  ...variantProps
}: TabContentProps) {
  return (
    <RadixTab.Content
      value={value}
      className={`${tabContentVariants(variantProps)}`}
    >
      <p>{content}</p>
    </RadixTab.Content>
  );
}

export const Tab = ({
  className,
  triggers,
  content,
  ...variantProps
}: TabProps) => {
  return (
    <RadixTab.Root
      className={`${tabRootVariants(variantProps)} ${className}`}
      defaultValue={"tab0"}
    >
      <TabList triggers={triggers} />
      {triggers.map((trigger, index) => (
        <TabContent content={content[index]} value={"tab" + index} />
      ))}
    </RadixTab.Root>
  );
};

import { Tabs as RadixTab } from "radix-ui";
import {
  tabRootVariants,
  tabTriggerVariants,
  tabListVariants,
  tabContentVariants,
  TabProps,
} from "./variants";

/**
 * Tab Component
 *
 * @param { TabProps } props
 * @returns Tab Component
 */
export const Tab = (props: TabProps) => {
  return (
    <RadixTab.Root
      className={`${tabRootVariants(props)} ${props.className}`}
      defaultValue={"tab0"}
    >
      <RadixTab.List className={`${tabListVariants(props)} ${props.className}`}>
        {props.triggers.map((trigger, index) => (
          <RadixTab.Trigger
            value={"tab" + index}
            className={`${tabTriggerVariants(props)} ${props.className}`}
          >
            {trigger}
          </RadixTab.Trigger>
        ))}
      </RadixTab.List>
      {props.triggers.map((trigger, index) => (
        <RadixTab.Content
          value={"tab" + index}
          className={`${tabContentVariants(props)} ${props.className}`}
        >
          <p>{props.children[index]}</p>
        </RadixTab.Content>
      ))}
    </RadixTab.Root>
  );
};

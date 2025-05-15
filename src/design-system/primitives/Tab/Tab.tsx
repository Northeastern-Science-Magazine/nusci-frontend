import { Tabs as RadixTab } from "radix-ui";
import { tabVariants, TabProps } from "./variants";

/**
 * Tab Component
 *
 * @param { TabProps } props
 * @returns Tab Component
 */
export const Tab = (props: TabProps) => {
  return (
    <RadixTab.Root className={`${tabVariants(props)} ${props.className}`} defaultValue={props.triggers[0]}>
      <RadixTab.List>
        {props.triggers.map((trigger) => (
          <RadixTab.Trigger value={trigger}>
            {trigger}
          </RadixTab.Trigger>
        ))}
      </RadixTab.List>
      {props.triggers.map((trigger, index) => (
        <RadixTab.Content value={trigger}>
          <p>{props.children[index]}</p>
        </RadixTab.Content>
      ))}
    </RadixTab.Root>
  );
};
/*
n.forEach((num1, index) => {
    const num2 = m[index];
    console.log(num1, num2);
  });*/
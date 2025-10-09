import { dividerVariants, DividerProps } from "./Variants";
import clsx from "clsx";
import { Flex, FlexChild } from "../Flex";

// export function Divider({children, className, ...props}: DividerProps) {
//   <div className={clsx(dividerVariants(props), className)}>
//     <Flex className="items-center"> 
//         <FlexChild>
//             {children}
//         </FlexChild>
//     </Flex>
//   </div>;
// }

export function Divider({className, ...props}: DividerProps) {
  return <div className={clsx(dividerVariants(props), className)}/>
}
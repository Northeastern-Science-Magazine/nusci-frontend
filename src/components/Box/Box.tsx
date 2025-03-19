import React from "react";
import { BoxProps, boxVariants } from "./variants";
/**
 * Box Component
 *
 * @param { BoxProps } props
 * @returns Box Component
 */
export const Box = (props : BoxProps) => {
return (
        <div className={boxVariants(props)} > 
        {props.children}
        </div>
);
}


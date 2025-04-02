import React from "react";
import { BoxProps, boxVariants } from "./variants";
/**
 * Box Component
 *
 * @param { BoxProps } props
 * @returns Box Component
 */
export const Box = ({className = "", ...props } : BoxProps) => {
return (
        <div className={`${boxVariants(props)}  ${className}`} > 
        {props.children}
        </div>
);
}


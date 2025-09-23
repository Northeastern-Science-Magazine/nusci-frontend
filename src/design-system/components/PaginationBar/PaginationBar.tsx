import { PaginationBarProps, PaginationItemProps } from "./variants";
import Button from "../../primitives/Button";
import { Icon, IconProps } from "../../primitives/Icon";
import React from "react";
import clsx from "clsx";

export function PaginationItem({
  className,
  onClick,
  isActive = false,
  color,
  text,
}: PaginationItemProps) {
  return (
    <div className={clsx(className, !isActive && "opacity-50")}>
      <Button onClick={onClick} color={color}>
        {text}
      </Button>
    </div>
  );
}

export function PaginationBar({
  className,
  onClickRight,
  onClickLeft,
  children,
  color,
}: PaginationBarProps) {
  return (
    <div className={"flex items-center gap-2"}>
      <Icon icon={"arrowleft"} onClick={onClickLeft} color={color} />
      {React.Children.map(children, (child) => {
        // Only clone PaginationItem components
        if (React.isValidElement(child) && child.type === PaginationItem) {
          return React.cloneElement(
            child as React.ReactElement<PaginationItemProps>,
            { color }
          );
        }
        if (React.isValidElement(child) && child.type === Icon) {
          return React.cloneElement(
            child as unknown as React.ReactElement<IconProps>,
            { color }
          );
        }

        return child;
      })}
      <Icon icon={"arrowright"} onClick={onClickRight} color={color} />
    </div>
  );
}

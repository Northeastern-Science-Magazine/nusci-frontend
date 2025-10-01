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
  maxItems,
  activeItem,
  onClickFunctionGenerator,
  color,
}: PaginationBarProps) {
  let maxVisible = 5;
  let start = 1;
  let end = maxItems;

  if (maxItems > maxVisible) {
    const half = Math.floor(maxVisible / 2);
    if (activeItem <= half) {
      start = 1;
      end = maxVisible;
    } else if (activeItem >= maxItems - half) {
      start = maxItems - maxVisible + 1;
      end = maxItems;
    } else {
      start = activeItem - half;
      end = activeItem + half;
    }
  }

  const pages = [];
  console.log(start, end);
  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem
        text={(i).toString()}
        isActive={i === activeItem}
        onClick={onClickFunctionGenerator(i)}
        color={color}
      />
    );
  }

  return (
    <div className={"flex items-center gap-2"}>
      <Icon icon={"arrowleft"} onClick={onClickLeft} color={color} />
      <div className={clsx("flex items-center gap-2", className)}>{pages}</div>
      <Icon icon={"arrowright"} onClick={onClickRight} color={color} />
    </div>
  );
}

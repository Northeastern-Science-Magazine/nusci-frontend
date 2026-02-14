import { PaginationBarProps } from "./variants";
import Button from "../../primitives/Button";
import { Icon } from "../../primitives/Icon";
import React from "react";
import clsx from "clsx";

export function PaginationBar({
  className,
  maxItems,
  activeItem,
  onClickFunctionGenerator,
  ...variantProps
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
  for (let i = start; i <= end; i++) {
    pages.push(
      <div className={clsx(className, i !== activeItem && "opacity-50")}>
        <Button onClick={onClickFunctionGenerator(i)} color={variantProps.color}>
          {i.toString()}
        </Button>
      </div>,
    );
  }

  return (
    <div className={"flex items-center gap-2"}>
      {activeItem !== 1 && (
        <Icon icon={"arrowleft"} onClick={onClickFunctionGenerator(activeItem - 1)} color={variantProps.color} />
      )}
      <div className={clsx("flex items-center gap-2", className)}>{pages}</div>
      {activeItem !== maxItems && (
        <Icon icon={"arrowright"} onClick={onClickFunctionGenerator(activeItem + 1)} color={variantProps.color} />
      )}
    </div>
  );
}

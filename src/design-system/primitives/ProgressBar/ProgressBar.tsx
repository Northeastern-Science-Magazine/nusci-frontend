import { Progress } from "radix-ui";
import React from "react";
import { progressBarVariants, type ProgressBarProps } from "./variants";
import clsx from "clsx";

export function ProgressBar({
  className,
  percentComplete,
  backgroundColor = "white",
  ...variantProps
}: ProgressBarProps) {
  return (
    <Progress.Root
      className={clsx(
        "relative h-[25px] w-[300px] overflow-hidden rounded-full outline outline-solid outline-2",
        { [`outline-${variantProps.color}`]: variantProps.color != "red" },
        { [`outline-${variantProps.color}-500`]: variantProps.color == "red" },
        { [`bg-${backgroundColor}`]: backgroundColor }
      )}
      style={{
        transform: "translateZ(0)",
      }}
      value={percentComplete}
    >
      <Progress.Indicator
        className={clsx(
          "ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full transition-transform duration-[660ms]",
          progressBarVariants({ ...variantProps })
        )}
        style={{ transform: `translateX(-${100 - percentComplete}%)` }}
      />
    </Progress.Root>
  );
}

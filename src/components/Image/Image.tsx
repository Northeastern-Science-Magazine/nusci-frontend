import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ImageProps, imageVariants } from "./variants";

/**
 * Image component
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = (props: ImageProps) => {
  return (
    <div className="w-[300px] overflow-hidden rounded-md shadow-[0_2px_10px] shadow-blackA4">
      <AspectRatio.Root ratio={props.ratio}>
        <img
          className={(imageVariants(props), "w-full h-full object-scale-down")}
          src={props.src}
          alt={props.alt}
        />
      </AspectRatio.Root>
    </div>
  );
};

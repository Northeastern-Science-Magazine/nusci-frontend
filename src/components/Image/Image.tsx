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
    <div className={`w-[${props.width}px]`}>
      <AspectRatio.Root ratio={props.ratio}>
        <img className={imageVariants(props)} src={props.src} alt={props.alt} />
      </AspectRatio.Root>
    </div>
  );
};

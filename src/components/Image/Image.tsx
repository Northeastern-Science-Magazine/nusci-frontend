import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ImageProps, imageVariants } from "./variants";

/**
 * Image component
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = (props: ImageProps) => {
  const ratioMap = {
    square: 1,
    wide: 16 / 9,
    default: 4 / 3,
  };

  return (
    <div className={props.width}>
      <AspectRatio.Root ratio={ratioMap[props.ratio || "default"]}>
        <img className={imageVariants(props)} src={props.src} alt={props.alt} />
      </AspectRatio.Root>
    </div>
  );
};

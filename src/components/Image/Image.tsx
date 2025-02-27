import { AspectRatio } from "radix-ui";
import { ImageProps, imageVariants } from "./variants";

/**
 * Image component
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = (props: ImageProps) => {
  return (
    <div className="Container">
      <AspectRatio.Root ratio={props.ratio}>
        <img className={imageVariants(props)}>
			{props.children}
		</img>
      </AspectRatio.Root>
    </div>
  );
};

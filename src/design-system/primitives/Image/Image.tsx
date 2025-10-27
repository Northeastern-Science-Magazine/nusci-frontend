import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ImageProps, imageVariants } from "./variants";

/**
 * Image component
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = ({ ratio, src, alt, width, raw = false, ...props }: ImageProps) => {
  return raw ? (
    <img className={imageVariants(props)} src={src} alt={alt} />
  ) : (
    <div className={width}>
      <AspectRatio.Root ratio={ratio}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={imageVariants(props)} src={src} alt={alt} />
      </AspectRatio.Root>
    </div>
  );
};

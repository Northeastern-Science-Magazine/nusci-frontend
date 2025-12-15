import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ImageProps, imageVariantsCN } from "./variants";

/**
 * Image component.
 *
 * Use boolean prop `raw` to get an image without
 * Radix Aspect Ratio
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = ({ ratio, src, alt, width, raw = false, ...props }: ImageProps) => {
  return raw ? (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={imageVariantsCN(props)} src={src} alt={alt} />
    </>
  ) : (
    <div className={width}>
      <AspectRatio.Root ratio={ratio}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={imageVariantsCN(props)} src={src} alt={alt} />
      </AspectRatio.Root>
    </div>
  );
};

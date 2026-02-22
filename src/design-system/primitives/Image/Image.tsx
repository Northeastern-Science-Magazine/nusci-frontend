import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ImageProps, imageVariantsCN } from "./variants";
import NextImage from "next/image"

/**
 * Image component.
 *
 * Use boolean prop `raw` to get an image without
 * Radix Aspect Ratio
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = ({ ratio, src, alt, width, height, raw = false, ...props }: ImageProps) => {
  return raw ? (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className={`relative ${width} ${height} ${imageVariantsCN(props)}`}>
            <NextImage fill className={imageVariantsCN(props)} src={src} alt={alt} />
        </div>
    </>
  ) : (
    <div className={width}>
      <AspectRatio.Root ratio={ratio}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className={`relative ${width} ${height} ${imageVariantsCN(props)}`}>
              <NextImage fill className={imageVariantsCN(props)} src={src} alt={alt} />
          </div>
      </AspectRatio.Root>
    </div>
  );
};

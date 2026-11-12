import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { ImageProps, imageVariantsCN } from './variants';
import NextImage from 'next/image';
import { isMediaPath } from '@/lib/helpers/media';

/**
 * Image component.
 *
 * Use boolean prop `raw` to get an image without
 * Radix Aspect Ratio
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = ({
  ratio,
  src,
  alt,
  width,
  height,
  raw = false,
  className,
  ...props
}: ImageProps) => {
  // the image optimizer can't load our /media route on Amplify, so serve those
  // straight from the route (already cached forever)
  const unoptimized = isMediaPath(src);

  return raw ? (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className={`relative ${width} ${height} ${imageVariantsCN(props)}`}>
        <NextImage
          fill
          className={imageVariantsCN(props, className)}
          src={src}
          alt={alt}
          unoptimized={unoptimized}
        />
      </div>
    </>
  ) : (
    <div className={width}>
      <AspectRatio.Root ratio={ratio}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div
          className={`relative ${width} ${height} ${imageVariantsCN(props)}`}
        >
          <NextImage
            fill
            className={imageVariantsCN(props, className)}
            src={src}
            alt={alt}
            unoptimized={unoptimized}
          />
        </div>
      </AspectRatio.Root>
    </div>
  );
};

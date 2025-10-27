import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ImageProps, imageVariants } from "./variants";

/**
 * Image component
 *
 * @param { ImageProps } props
 * @returns Image Component
 */
export const Image = ({ratio, src, alt, width, ...props}: ImageProps) => {

  return (
    <div className="w-full h-full object-cover">
      {ratio ? 
      <AspectRatio.Root ratio={ratio}>
        <img className={imageVariants(props)} src={src} alt={alt} />
      </AspectRatio.Root>
      : 
      <img className={imageVariants(props)} src={src} alt={alt} />
      }
    </div>
  );
};

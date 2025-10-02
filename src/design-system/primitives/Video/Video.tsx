import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VideoProps, videoVariants } from "./variants";

/**
 * Video component
 *
 * @param { VideoProps } props
 * @returns Video Component
 */
export const Video = ({src, alt, width, ratio, poster, ...props}: VideoProps) => {
  return (
    <div className="w-full h-full object-cover">
      {ratio ?
      <AspectRatio.Root ratio={ratio}>
        <video 
        className={videoVariants(props)} 
         
          {...props}
        />
      </AspectRatio.Root>
      : 
       <video 
        className={videoVariants(props)} 
         
          {...props}
        />
       }
    </div>
  );
};

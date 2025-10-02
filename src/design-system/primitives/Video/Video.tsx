import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VideoProps, videoVariants } from "./variants";

/**
 * Video component
 *
 * @param { VideoProps } props
 * @returns Video Component
 */
export const Video = ({src, alt, width, ratio, poster, ...}: VideoProps) => {
  return (
    <div className="w-full h-full object-cover">
      {props.ratio ?
      <AspectRatio.Root ratio={props.ratio}>
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

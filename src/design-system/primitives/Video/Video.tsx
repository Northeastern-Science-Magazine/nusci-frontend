import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { VideoProps, videoVariants } from "./variants";

/**
 * Video component
 *
 * @param { VideoProps } props
 * @returns Video Component
 */
export const Video = (props: VideoProps) => {
  return (
    <div className={props.width}>
      <AspectRatio.Root ratio={props.ratio}>
        <video 
        className={videoVariants(props)} 
         
          {...props}
        />
      </AspectRatio.Root>
    </div>
  );
};

import { CardProps } from "../../primitives/Card/variants";
import { ImageProps } from '../../primitives/Image/variants'

export type MediaDirection = "right" | "left" | "top" | "bottom";


export interface MediaCardProps extends CardProps {
    MediaDirection: MediaDirection;

}

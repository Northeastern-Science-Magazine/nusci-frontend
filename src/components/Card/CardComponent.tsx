import { CardProps, cardVariants } from "./variants";

/**
 * Card Component
 *
 * @param { CardProps } props
 * @returns Card Component
 */
export const Card = (props: CardProps) => {
  return (
    <div className={cardVariants(props)}>
      <div className="flex justify-between items-start">
        <div className="team-title/description">
          {props.title && <h3>{props.title}</h3>}
          {props.title && props.paragraph && <div className="p-1"></div>}
          {props.paragraph && <p className="text-[#757575]">{props.paragraph}</p>}
          {props.children}
        </div>
        {props.imageURL && <img src={props.imageURL} alt={props.title || "Card image"} className="size-40"/>}
      </div>
    </div>
  );
};

export default Card;
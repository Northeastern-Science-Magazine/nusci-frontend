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
          {props.teamTitle && <h3>{props.teamTitle}</h3>}
          {props.teamTitle && props.teamDescription && <div className="p-1"></div>}
          {props.teamDescription && <p className="text-[#757575]">{props.teamDescription}</p>}
          {props.children}
        </div>
        {props.imageURL && <img src={props.imageURL} alt={props.teamTitle || "Card image"} className="size-40"/>}
      </div>
    </div>
  );
};

export default Card;
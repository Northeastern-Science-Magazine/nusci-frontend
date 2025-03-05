import { CardProps, cardVariants } from "./variants";

export default function Card(props: CardProps) {
  const { 
    variant = "default", 
    size = "md", 
    backgroundColor = "black", 
    textColor = "white", 
    teamTitle, 
    teamDescription, 
    imageURL, 
    ...restProps 
  } = props;
  
  return (
    <div className={cardVariants({
      variant,
      size,
      backgroundColor,
      textColor,
      ...restProps
    })}>
      <div className="p-6 flex justify-between">
        <div className="team-title/description">
          <h3>{teamTitle}</h3>
          <div className="p-1"></div>
          <p>{teamDescription}</p>
        </div>
        {imageURL && <img src={imageURL} className="size-20" alt={teamTitle || "Card image"} />}
      </div>
    </div>
  );
}
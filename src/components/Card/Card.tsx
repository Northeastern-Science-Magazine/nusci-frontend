import { CardProps, cardVariants } from "./variants";

export default function Card(props: CardProps) {
  const {
    variant = "default",
    size = "md",
    backgroundColor = "black",
    textColor = "white",
    title,
    paragraph,
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
        <div className="team-title/description flex-1 overflow-hidden">
          <h3>{title}</h3>
          <div className="p-1"></div>
          <p className="break-words">{paragraph}</p>
        </div>
        {imageURL && <img src={imageURL} className="size-40 flex-shrink-0 p-8" />}
      </div>
    </div>
  );
}
export interface CardProps {
    /* Type of varient */
    variant?: 'default' | 'shadow' | 'rounded' | 'border';

    /* Size of the Card */
    size?: 'sm' | 'md' | 'lg';
    /* Background color of the card */
    backgroundColor: 'white' | 'black'
    /* Color of the text in the card */
    textColor?: 'white' | 'black' | 'red' | 'green' | 'brown' | 'yellow' | 'blue' | 'lightBlue'
    /* Team Title */
    title?: string;
    /** Card description */
    paragraph?: string;
    /** URL for the card image */
    imageURL?: string;
    /** Additional content */
    children?: React.ReactNode;
}

/** Primary Card component for displaying content */
export const Card = ({
    variant = 'default',
    size = 'md',
    backgroundColor = 'black',
    textColor = 'white',
    title,
    paragraph,
    imageURL,
    ...props
  }: CardProps) => {
    return (
      <div
        className={['card', `card--${variant}`, `card--${size}`, `card--${backgroundColor}`, `card--text-${textColor}`].join(' ')}
        {...props}
      >
        {imageURL && <img className="card__image" src={imageURL} alt={title || 'Card image'} />}
        <div className="card__content">
          {title && <h3 className="card__title">{title}</h3>}
          {paragraph && <p className="card__description">{paragraph}</p>}
        </div>
      </div>
    );
  };

  export default Card;


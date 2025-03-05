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
    teamTitle?: string;
    /** Card description */
    teamDescription?: string;
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
    teamTitle,
    teamDescription,
    imageURL,
    ...props
  }: CardProps) => {
    return (
      <div
        className={['card', `card--${variant}`, `card--${size}`, `card--${backgroundColor}`, `card--text-${textColor}`].join(' ')}
        {...props}
      >
        {imageURL && <img className="card__image" src={imageURL} alt={teamTitle || 'Card image'} />}
        <div className="card__content">
          {teamTitle && <h3 className="card__title">{teamTitle}</h3>}
          {teamDescription && <p className="card__description">{teamDescription}</p>}
        </div>
      </div>
    );
  };

  export default Card;


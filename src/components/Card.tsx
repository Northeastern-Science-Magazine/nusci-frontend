// Define props type
interface CardProps {
    imageURL: string;
    teamTitle: string;
    teamDescription: string;
  }
  
  // Card Component
  export default function Card({ imageURL, teamTitle, teamDescription }: CardProps) {
    return (
      <div className="max-w-lg bg-white rounded-lg border-gray-200 drop-shadow-2xl  h-1/2">
        <div className="p-6 flex justify-stretch">
          <div className="team-title/description">
          <h3 className="">{teamTitle}</h3>
          <div className="p-1"></div>
          <p className="text-[#757575]">{teamDescription}</p> 
          </div>
          <img src={imageURL} className="size-40"/>
        </div>
      </div>
    );
  }
 
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


type ConversationCardProps = {
    avatarImage: string;
    avatarFallback: string;
    name: string;
    lastMessage: string;
    date: string;
    time: string;
}

const ConversationCard: React.FC<ConversationCardProps> = ({avatarImage, avatarFallback, name, lastMessage, date, time}) => {
  return (
    <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={avatarImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <h2>{name}</h2>
        <div className="w-full h-[30%]">
            <p className="h-full w-full max-w-[14rem]  truncate">{lastMessage}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs">{date}</p>
        <p className="text-xs">{time}</p>
      </div>
    </div>
  );
};

export default ConversationCard;

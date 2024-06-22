import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


type ChatCardProps = {
    imageUrl: string;
    requestedNameInitials: string;
    name: string;
}


const ChatCard: React.FC<ChatCardProps> = ({imageUrl, requestedNameInitials, name}) => {
  return (
    <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{requestedNameInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <h2>{name}</h2>
        <div className="w-full h-[30%]">
          <p className="h-full w-full max-w-[14rem]  truncate">"TESTETE"</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs">teste</p>
        <p className="text-xs">teste</p>
      </div>
    </div>
  );
};

export default ChatCard;

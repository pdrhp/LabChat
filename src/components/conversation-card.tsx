import ChatRequest from "@/models/ChatRequest";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type ConversationCardProps = {
  cardData: ChatRequest;
};

const ConversationCard: React.FC<ConversationCardProps> = ({ cardData }) => {
  const [imageUrl, setImageUrl] = useState();

  const name_initials = cardData.requested.nome
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const date = new Date(cardData.timestamp);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  if (cardData instanceof ChatRequest) {
    return (
      <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{name_initials}</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-[100%] flex flex-col justify-center">
          <h2>{cardData.requested.nome}</h2>
          <div className="w-full h-[30%]">
            <p className="h-full w-full max-w-[14rem] font-bold text-orange-500">
              Aguardando resposta
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs">{formattedDate}</p>
          <p className="text-xs">{formattedTime}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name_initials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <h2>{cardData.requested.nome}</h2>
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

export default ConversationCard;

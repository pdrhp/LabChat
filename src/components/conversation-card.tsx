import { useAuth } from "@/context/auth-context";
import useFormattedData from "@/hooks/useFormattedData";
import ChatItem from "@/types/chat-item";
import { useState } from "react";
import RequestReceiverCard from "./conversation-card-components.tsx/request-receiver-card";
import RequestSenderCard from "./conversation-card-components.tsx/request-sender-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type ConversationCardProps = {
  cardData: ChatItem;
};

const ConversationCard: React.FC<ConversationCardProps> = ({ cardData }) => {
  const [imageUrl, setImageUrl] = useState();
  const { userSession } = useAuth();

  const { formattedDate, formattedTime, requestedNameInitials, requesterNameInitials } =
    useFormattedData(cardData);

  switch (cardData.type) {
    case "request":
      if (cardData.requester.id === userSession?.id)
        return (
          <RequestSenderCard formattedDate={formattedDate} formattedTime={formattedTime} requestedName={cardData.requested.nome} requestedNameInitials={requestedNameInitials} imageUrl={imageUrl}/>
        );
      else
        return (
          <RequestReceiverCard requestId={cardData.id} formattedDate={formattedDate} formattedTime={formattedTime} requesterName={cardData.requester.nome} requesterNameInitials={requesterNameInitials} imageUrl={imageUrl}/>
        );
    case "conversation":
      return (
        <div className="p-1 w-full h-[10%] border grid grid-cols-[auto,0.8fr,auto] gap-2 cursor-pointer">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{requestedNameInitials}</AvatarFallback>
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
  }
};

export default ConversationCard;

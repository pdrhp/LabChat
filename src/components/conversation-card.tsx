import { useAuth } from "@/context/auth-context";
import useFormattedData from "@/hooks/useFormattedData";
import ChatItem from "@/types/chat-item";
import { useState } from "react";
import ChatCard from "./conversation-card-components.tsx/chat-card";
import RequestReceiverCard from "./conversation-card-components.tsx/request-receiver-card";
import RequestSenderCard from "./conversation-card-components.tsx/request-sender-card";

type ConversationCardProps = {
  cardData: ChatItem;
};

const ConversationCard: React.FC<ConversationCardProps> = ({ cardData }) => {
  const [imageUrl, setImageUrl] = useState('');
  const { userSession } = useAuth();


  const { formattedDate, formattedTime, requestedNameInitials, requesterNameInitials, lastMessage } =
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
    case "accepted":
      if(cardData.requester.id === userSession?.id)
        return (
          <ChatCard lastMessage={lastMessage} conversationId={cardData.id} imageUrl={imageUrl} requestedNameInitials={requestedNameInitials} name={cardData.requested.nome}/>
        );
      else
        return (
          <ChatCard lastMessage={lastMessage} conversationId={cardData.id} imageUrl={imageUrl} requestedNameInitials={requesterNameInitials} name={cardData.requester.nome}/>
        );
  }
};

export default ConversationCard;

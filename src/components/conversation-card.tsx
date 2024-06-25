import { useAuth } from "@/context/auth-context";
import useFormattedData from "@/hooks/useFormattedData";
import ChatItem from "@/types/chat-item";
import ChatCard from "./conversation-card-components.tsx/chat-card";
import RequestReceiverCard from "./conversation-card-components.tsx/request-receiver-card";
import RequestSenderCard from "./conversation-card-components.tsx/request-sender-card";

type ConversationCardProps = {
  cardData: ChatItem;
};

const ConversationCard: React.FC<ConversationCardProps> = ({ cardData }) => {
  const { userSession } = useAuth();

  const { formattedDate, formattedTime, requestedNameInitials, requesterNameInitials } =
    useFormattedData(cardData);

  const lastMessage = cardData.messages ? cardData.messages[cardData.messages.length - 1] : undefined;

  switch (cardData.type) {
    case "request":
      if (cardData.requester.id === userSession?.id)
        return (
          <RequestSenderCard requestedId={cardData.requested.id} online={cardData.requested.online} formattedDate={formattedDate} formattedTime={formattedTime} requestedName={cardData.requested.nome} requestedNameInitials={requestedNameInitials}/>
        );
      else
        return (
          <RequestReceiverCard requesterId={cardData.requester.id} requestId={cardData.id} online={cardData.requested.online} formattedDate={formattedDate} formattedTime={formattedTime} requesterName={cardData.requester.nome} requesterNameInitials={requesterNameInitials}/>
        );
    case "accepted":
      if(cardData.requester.id === userSession?.id)
        return (
          <ChatCard lastMessage={lastMessage} requestId={cardData.id} requestedId={cardData.requested.id} online={cardData.requested.online} conversationId={cardData.id}  requestedNameInitials={requestedNameInitials} name={cardData.requested.nome}/>
        );
      else
        return (
          <ChatCard lastMessage={lastMessage} requestId={cardData.id} requestedId={cardData.requester.id} online={cardData.requester.online} conversationId={cardData.id}  requestedNameInitials={requesterNameInitials} name={cardData.requester.nome}/>
        );
  }
};

export default ConversationCard;

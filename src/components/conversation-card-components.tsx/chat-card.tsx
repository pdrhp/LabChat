import ChatMessage from "@/Interfaces/chat-message";
import { useChat } from "@/context/chat-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ChatCardProps = {
  imageUrl: string;
  requestedNameInitials: string;
  name: string;
  conversationId: number;
  lastMessage?: ChatMessage;
};

const ChatCard: React.FC<ChatCardProps> = ({
  imageUrl,
  requestedNameInitials,
  name,
  lastMessage,
  conversationId
}) => {

  const {handleActualConversationChange, actualConversation} = useChat();

  const lastMessageDate = lastMessage ? new Date(lastMessage.timestamp).toLocaleDateString() : "";
  const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString() : "";

  return (
    <div onClick={() => handleActualConversationChange(conversationId)} className={`p-1 w-full h-[10%] border grid grid-cols-[auto,0.95fr,auto] gap-2 cursor-pointer ${actualConversation && 'bg-neutral-900 border-0'}`}>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{requestedNameInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col justify-center">
        <h2>{name}</h2>
        <div className="w-full h-[30%]">
          <p className={`h-full w-full max-w-[14rem] text-sm truncate ${lastMessage?.message ? '' : 'text-zinc-400'}`}>
            {lastMessage ? lastMessage.message : `Escreva sua primeira mensagem`}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs">{lastMessageDate}</p>
        <p className="text-xs">{lastMessageTime}</p>
      </div>
    </div>
  );
};

export default ChatCard;

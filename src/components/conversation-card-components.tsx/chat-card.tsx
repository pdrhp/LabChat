import ChatMessage from "@/Interfaces/chat-message";
import { useChat } from "@/context/chat-context";
import useQueryImage from "@/hooks/useQueryImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ChatCardProps = {
  requestedNameInitials: string;
  name: string;
  conversationId: number;
  lastMessage?: ChatMessage;
  requestedId: string;
  requestId: number;
  online?: boolean;
};

const ChatCard: React.FC<ChatCardProps> = ({
  requestedNameInitials,
  name,
  lastMessage,
  conversationId,
  requestedId,
  requestId,
  online
}) => {

  const {data} = useQueryImage(requestedId)
  const {handleActualConversationChange, actualConversation} = useChat();

  const lastMessageDate = lastMessage ? new Date(lastMessage.timestamp).toLocaleDateString() : "";
  const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString() : "";

  console.log(data)

  return (
    <div onClick={() => handleActualConversationChange(conversationId)} className={`p-1 w-full border grid grid-cols-[auto,0.95fr,auto] gap-2 cursor-pointer ${actualConversation?.id === requestId && 'bg-neutral-900 border-0'}`}>
      <div className="flex items-center">
        <Avatar className={`border ${online ? 'border-green-500' : 'border-red-500'}`}>
          <AvatarImage src={data} />
          <AvatarFallback>{requestedNameInitials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-[100%] flex flex-col p-2 justify-center">
        <h2>{name}</h2>
        <div className="w-full h-[70%]">
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

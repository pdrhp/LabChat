import { useAuth } from "@/context/auth-context";
import { useChat } from "@/context/chat-context";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import MessageCard from "./message-card";
import MessageInput from "./message-input";

const ChatContainer = () => {
  const { sendMessageToUser, actualConversation } = useChat();
  const { userSession } = useAuth();

  const lastMessageEndRef = useRef<HTMLDivElement>(null);

  const lastMessage = actualConversation?.messages[actualConversation?.messages.length - 1];

  useEffect(() => {
    lastMessageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastMessage]);

  const handleSendMessage = (message: string) => {
    const requestedId =
      actualConversation?.requested.id === userSession!.id
        ? actualConversation.requester.id
        : actualConversation?.requested.id;

    if (!actualConversation || !requestedId) {
      toast.error("Erro ao enviar mensagem");
      return;
    }
    const sendMessageDto = {
      senderId: userSession!.id,
      receiverId: requestedId,
      message: message,
      requestId: actualConversation.id,
    };
    sendMessageToUser(sendMessageDto);
  };

  return (
    <>
      <div className="h-[75%] p-2 flex flex-col gap-2 overflow-y-auto">
        {actualConversation?.messages &&
          actualConversation.messages.length > 0 &&
          actualConversation.messages.map((msg, index) => (
            <>
              <MessageCard key={index} Message={msg} />
              {index === actualConversation.messages.length - 1 && <div className="" key={'L' + index} ref={lastMessageEndRef}></div>}
            </>
          ))}
      </div>
      <div className="flex-1">
        <MessageInput sendMessage={handleSendMessage} />
      </div>
    </>
  );
};

export default ChatContainer;

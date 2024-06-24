import { useAuth } from "@/context/auth-context"
import { useChat } from "@/context/chat-context"
import { toast } from "sonner"
import MessageInput from "./message-input"




const ChatContainer = () => {

  const {sendMessageToUser, actualConversation} = useChat();
  const {userSession} = useAuth();

  const requestedId = actualConversation?.requested.id === userSession!.id ? actualConversation.requester.id : actualConversation?.requested.id;

  const handleSendMessage = (message: string) => {

    if(!actualConversation || !requestedId){
      toast.error('Erro ao enviar mensagem')
      return;
    }

    const sendMessageDto = {
      senderId: userSession!.id,
      receiverId: requestedId,
      message: message,
      requestId: actualConversation.id
    }
    sendMessageToUser(sendMessageDto);
  }


  return (
    <>
    <div className="h-[78%]"></div>
        <div className=" flex-1">
          <MessageInput sendMessage={handleSendMessage} />
        </div>
    </>
  )
}

export default ChatContainer

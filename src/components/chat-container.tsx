import ChatRequest from "@/Interfaces/chat-request"
import { useAuth } from "@/context/auth-context"
import { useChat } from "@/context/chat-context"
import MessageInput from "./message-input"

type ChatContainerProps = {
  actualConversation: ChatRequest
}


const ChatContainer: React.FC<ChatContainerProps> = ({actualConversation}) => {

  const {sendMessageToUser} = useChat();
  const {userSession} = useAuth();
  const requestedId = actualConversation.requested.id === userSession!.id ? actualConversation.requester.id : actualConversation.requested.id;

  const handleSendMessage = (message: string) => {
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

import ChatMessage from "@/Interfaces/chat-message";
import { useAuth } from "@/context/auth-context";
import { Card } from "./ui/card";


type MessageCardProps = {
    Message: ChatMessage;
}


const MessageCard: React.FC<MessageCardProps> = ({Message}) => {

    const {userSession} = useAuth();

    const isMessageFromUser = Message.senderId === userSession?.id;
    const hourAndMinutes = new Date(Message.timestamp).toLocaleTimeString().slice(0, 5);

  return (
    <div className={`w-full flex ${isMessageFromUser ? 'justify-end' : 'justify-start'}`}>
      <Card className="w-[30%] flex p-3 relative">
        <div className="w-[91%]">
            <p>{Message.message}</p>
        </div>
        <div className="absolute flex justify-center right-2 bottom-1">
            <p>{hourAndMinutes}</p>
        </div>

      </Card>
    </div>
  );
};

export default MessageCard;

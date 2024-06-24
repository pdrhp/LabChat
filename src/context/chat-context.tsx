import ChatMessage from "@/Interfaces/chat-message";
import ChatRequest from "@/Interfaces/chat-request";
import ChatItem from "@/types/chat-item";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./auth-context";

interface ChatContextType {
  socketConnection: HubConnection | undefined;
  connectSignalR: () => Promise<void>;
  sideBarConversationItems: ChatItem[];
  addRequest: (request: ChatRequest) => void;
  actualConversation: ChatItem | null;
  handleActualConversationChange: (conversationId: number) => void;
  sendMessageToUser: (sendMessageDto: { receiverId: string, senderId: string, message: string, requestId: number}) => void;
}

interface ChatProviderProps {
  children: ReactNode;
}

const ChatContext = createContext<ChatContextType | null>(null);

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [socketConnection, setSocketConnection] = useState<
    HubConnection | undefined
  >();

  const [sideBarConversationItems, setSideBarConversationItems] = useState<
    ChatItem[]
  >([]);

  const sideBarConversationItemsRef = useRef<ChatItem[]>([]);
  

  useEffect(() => {
    sideBarConversationItemsRef.current = sideBarConversationItems;
  }, [sideBarConversationItems])



  const [actualConversation, setActualConversation] = useState<ChatItem | null>(
    null
  );

  const { userSession } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;

  const connectSignalR = async () => {
    if (socketConnection) {
      return;
    }

    try {
      const conn = new HubConnectionBuilder()
        .withUrl(`${apiUrl}/connectchat`)
        .configureLogging(LogLevel.Information)
        .build();

      setSocketConnection(conn);

      // Listener pra receber os requests e conversas ativas ao se conectar
      conn.on("ReceiveActiveConversations", (conversations: ChatItem[]) => {
        conversations.forEach((conversation) => {
          conversation.accepted == true && conversation.rejected == false
            ? (conversation.type = "accepted")
            : (conversation.type = "request");
          setSideBarConversationItems((prev) => [...prev, conversation]);
        });
      });

      conn.on("ReceiveMessage", (message: ChatMessage) => {
        const conversation = sideBarConversationItemsRef.current.find(item => item.id === message.chatRequestId);
        if(conversation){
          conversation.messages.push(message);
          const ListWithRemovedPastItem = sideBarConversationItemsRef.current.filter(
            (item) => item.id !== conversation.id
          );
          setSideBarConversationItems([...ListWithRemovedPastItem, conversation]);
        }
      })

      conn.on("ReceiveRequest", (request: ChatRequest) => {
        request.type = "request";
        setSideBarConversationItems([...sideBarConversationItemsRef.current, request]);
        console.log(sideBarConversationItems)
        toast.success("Nova solicitação de conversa recebida", {
          description: `De ${request.requester.nome}`,
          duration: 5000,
          position: "top-right"
        });
      });

      conn.on(
        "ReceiveRequestResponse",
        (request: ChatItem, accepted: boolean) => {
          accepted ? (request.type = "accepted") : (request.type = "rejected");
          const ListWithRemovedPastItem = sideBarConversationItemsRef.current.filter(
            (item) => item.id !== request.id
          );
          setSideBarConversationItems([...ListWithRemovedPastItem, request]);
          if (accepted && request.requester.id === userSession?.id) {
            toast.success("Solicitação aceita", {
              description: `De ${request.requested.nome}`,
              duration: 5000,
              position: "top-right"
            });
          }
          if (!accepted && request.requester.id === userSession?.id) {
            toast.error("Solicitação recusada", {
              description: `De ${request.requested.nome}`,
              duration: 5000,
              position: "top-right"
            });
          }
        }
      );

      conn.on("ReceiveMessageFromServer", (admin: string, message: string) => {
        console.log(admin, message);
      });

      await conn.start();
    } catch (error) {
      console.log(error);
    }
  };

  const addRequest = (request: ChatRequest) => {
    setSideBarConversationItems([ ...sideBarConversationItemsRef.current ,request]);
  };


  const handleActualConversationChange = (conversationId: number) => {
    const conversation = sideBarConversationItemsRef.current.find(
      (item) => item.id == conversationId
    );
    if (
      conversation &&
      conversation.type == "accepted" &&
      conversation.id != actualConversation?.id
    ) {
      setActualConversation(conversation);
    }
  };

  const sendMessageToUser = (sendMessageDto: { receiverId: string, senderId: string, message: string, requestId: number}) => {
    socketConnection?.invoke("SendMessageToUser", sendMessageDto);
  }

  return (
    <ChatContext.Provider
      value={{
        socketConnection,
        connectSignalR,
        sideBarConversationItems,
        addRequest,
        actualConversation,
        handleActualConversationChange,
        sendMessageToUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};

export { ChatProvider, useChat };


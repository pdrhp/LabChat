import ChatRequest from "@/Interfaces/chat-request";
import ChatItem from "@/types/chat-item";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./auth-context";

interface ChatContextType {
  socketConnection: HubConnection | undefined;
  connectSignalR: () => Promise<void>;
  sideBarConversationItems: ChatItem[];
  addRequest: (request: ChatRequest) => void;
  actualConversation: ChatItem | null;
  handleActualConversationChange: (conversationId: number) => void;
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
        console.log(conversations);
        conversations.forEach((conversation) => {
          conversation.accepted == true && conversation.rejected == false
            ? (conversation.type = "accepted")
            : (conversation.type = "request");
          setSideBarConversationItems([
            ...sideBarConversationItems,
            conversation,
          ]);
        });
      });

      conn.on("ReceiveIndividualMessage", (sender: string, message: string) => {
        console.log(sender, message);
      });

      conn.on("ReceiveRequest", (request: ChatRequest) => {
        request.type = "request";
        setSideBarConversationItems([...sideBarConversationItems, request]);
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
          const ListWithRemovedPastItem = sideBarConversationItems.filter(
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
    setSideBarConversationItems([...sideBarConversationItems, request]);
  };

  const handleActualConversationChange = (conversationId: number) => {
    const conversation = sideBarConversationItems.find(
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

  return (
    <ChatContext.Provider
      value={{
        socketConnection,
        connectSignalR,
        sideBarConversationItems,
        addRequest,
        actualConversation,
        handleActualConversationChange,
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


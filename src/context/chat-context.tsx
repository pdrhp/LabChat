import ChatRequest from "@/Interfaces/chat-request";
import ChatItem from "@/types/chat-item";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ReactNode, createContext, useContext, useState } from "react";




interface ChatContextType {
    socketConnection: HubConnection | undefined;
    connectSignalR: () => Promise<void>;
    sideBarConversationItems: ChatItem[];
    addRequest: (request: ChatRequest) => void;
}


interface ChatProviderProps {
    children: ReactNode;
}


const ChatContext = createContext<ChatContextType | null>(null);

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [socketConnection, setSocketConnection] = useState<HubConnection | undefined>();
    const [sideBarConversationItems, setSideBarConversationItems] = useState<ChatItem[]>([]);

    const apiUrl = import.meta.env.VITE_API_URL;


    const connectSignalR = async () => {
        try {
          const conn = new HubConnectionBuilder()
            .withUrl(`${apiUrl}/connectchat`)
            .configureLogging(LogLevel.Information)
            .build();
    
          setSocketConnection(conn);

    
    
          conn.on("ReceiveIndividualMessage", (sender: string, message: string) => {
            console.log(sender, message);
          });

          conn.on("ReceiveRequest", (request: ChatRequest) => {
            request.type = "request";
            setSideBarConversationItems([...sideBarConversationItems, request]);
          })

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
      }

      return (
        <ChatContext.Provider value={{ socketConnection, connectSignalR, sideBarConversationItems, addRequest}}>
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
}

export { ChatProvider, useChat };


import { UserSession } from "@/Interfaces/UserSession";
import { httpGet, httpPost } from "@/api/Client";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  userSession: UserSession | undefined;
  socketConnection: HubConnection | undefined;
  login: (userData: {
    email: string;
    password: string;
  }) => Promise<UserSession>;
  logout: () => Promise<UserSession>;
  connectSignalR: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserSession | undefined>(
    undefined
  );
  const [socketConnection, setSocketConnection] = useState<
    HubConnection | undefined
  >(undefined);

  useEffect(() => {
    httpGet<UserSession>("auth/verifySession").then((response) => {
      if (response.flag) {
        setUserSession(response.data);
      }
    });
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    const response = await httpPost<UserSession>("/auth/signin", userData);

    if (response.flag) {
      setUserSession(response.data);
    }

    return response.data;
  };

  const logout = async () => {
    const response = await httpPost<UserSession>("/auth/logout");

    if (response.flag) {
      setUserSession(undefined);
    }

    return response.data;
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const connectSignalR = async () => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl(`${apiUrl}/connectchat`)
        .configureLogging(LogLevel.Information)
        .build();

      setSocketConnection(conn);

      conn.on("Teste", (arg1, arg2) => {
        console.log(arg1, arg2);
      });

      conn.on("TesteEspecifico", (arg1, arg2) => {
        console.log(arg1, arg2);
      });

      conn.on("ReceiveIndividualMessage", (sender: string, message: string) => {
        console.log(sender, message);
      });

      conn.on("ReceiveMessageFromServer", (admin: string, message: string) => {
        console.log(admin, message);
      });

      await conn.start();
      await conn.invoke("Test");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ userSession,socketConnection, login, logout, connectSignalR }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };


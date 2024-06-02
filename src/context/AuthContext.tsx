import { UserSession } from "@/Interfaces/UserSession";
import { httpGet, httpPost } from "@/api/Client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface AuthContextType {
  userSession: UserSession | undefined;
  login: (userData: {
    email: string;
    password: string;
  }) => Promise<UserSession>;
  logout: () => Promise<UserSession>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserSession | undefined>(
    undefined
  );

  useEffect(() => {
    httpGet<UserSession>("auth/verifySession").then((response) => {
        if(response.flag){
            setUserSession(response.data)
        }
    })    
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

  return (
    <AuthContext.Provider value={{ userSession, login, logout }}>
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


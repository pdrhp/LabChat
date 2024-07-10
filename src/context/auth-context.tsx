import { UserSession } from "@/Interfaces/user-session";
import { httpGet, httpPost } from "@/api/Client";
import { getProfilePictureById } from "@/services/user.service";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  userSession: UserSession | undefined;
  login: (userData: {
    username: string;
    password: string;
  }) => Promise<UserSession>;
  logout: () => Promise<UserSession>;
  setProfilePicture: (profilePicture: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserSession | undefined>();

  useEffect(() => {
    httpGet<UserSession>("auth/verifySession").then((response) => {
      if (response.flag) {
        setUserSession(response.data);
        getProfilePictureById(response.data.id).then((response) => {
          setUserSession((prev) => {
            if (prev) {
              return {
                ...prev,
                profilePicture: response,
              };
            }
            return prev;
          });
        })
      }
    });

  }, []);


  const setProfilePicture = (profilePicture: string) => {
    setUserSession((prev) => {
      if (prev) {
        return {
          ...prev,
          profilePicture: profilePicture,
        };
      }
      return prev;
    });
  }

  const login = async (userData: { username: string; password: string }) => {
    const response = await httpPost<UserSession>("/auth/signin", userData);

    if (response.flag) {
      setUserSession(response.data);
    }

    return response.data;
  };

  const logout = async () => {
    const response = await httpPost<UserSession>("/auth/signOut");

    if (response.flag) {
      setUserSession(undefined);
    }
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ userSession, login, logout, setProfilePicture }}>
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


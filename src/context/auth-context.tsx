import { UserSession } from "@/Interfaces/user-session";
import { httpGet, httpPost, Response } from "@/api/Client";
import { getProfilePictureById } from "@/services/user.service";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type userRegisterData = {
  Nome: string;
  Username: string;
  Password: string;
  ConfirmPassword: string;
};

interface AuthContextType {
  userSession: UserSession | undefined;
  authorizingSession: boolean;
  login: (userData: {
    username: string;
    password: string;
  }) => Promise<UserSession>;
  register: (userData: userRegisterData) => Promise<
    Response<{
      Nome: string;
      Id: string;
      UserName: string;
      online: boolean;  
    }>
  >;
  logout: () => Promise<UserSession>;
  setProfilePicture: (profilePicture: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserSession | undefined>();
  const [authorizingSession, setAuthorizingSession] = useState<boolean>(true);

  useEffect(() => {
    setAuthorizingSession(true);
    httpGet<UserSession>("auth/verifySession")
      .then((response) => {
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
          });
        }
        setTimeout(() => {
          setAuthorizingSession(false);
        }, 600);
      })
      .catch(() => {
        setAuthorizingSession(false);
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
  };

  const register = async (userData: userRegisterData) => {
    const response = await httpPost<
      Response<{
        Nome: string;
        Id: string;
        UserName: string;
        online: boolean;
      }>
    >("/auth/signup", userData);

    return response.data;
  };

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
    <AuthContext.Provider
      value={{
        userSession,
        authorizingSession,
        login,
        register,
        logout,
        setProfilePicture,
      }}
    >
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


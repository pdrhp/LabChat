import AuthenticationTab from "@/components/authentication-tab";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const appVersion = import.meta.env.VITE_APP_VERSION;

  const {authorizingSession, userSession} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userSession) {
      navigate("/chat");
    }
  }, [navigate, userSession])

  if(authorizingSession)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="w-20 h-20 animate-spin"/>
      </div>
  )

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
        <AuthenticationTab/>
        <p className="text-zinc-500">{appVersion}</p>
    </div>
  )
}

export default LoginPage
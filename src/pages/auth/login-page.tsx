import AuthenticationTab from "@/components/authentication-tab";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

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
    <div className="h-full w-full flex justify-center items-center">
        <AuthenticationTab/>
    </div>
  )
}

export default LoginPage
import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";


type PrivateRouteProps = {
    element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({element}) => {
    const {userSession} = useAuth();
    return userSession ? element : <Navigate to={"/login"}/>;
}

export default PrivateRoute;
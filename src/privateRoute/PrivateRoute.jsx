import { Navigate } from "react-router-dom";
import useAuth from "../customHook/useAuth";


const PrivateRoute = ({children}) => {
    const{user,loading}=useAuth()
    if(user){
        return children
    }
    if(loading){
        return <div className="flex justify-center mt-80"><span className="loading loading-bars loading-lg"></span></div>
    }
    return <Navigate to='login'></Navigate>
};

export default PrivateRoute;
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../customHook/useAuth";


const PrivateRoute = ({children}) => {
    const{user,loading}=useAuth()
    if(loading){
        return <div className="flex justify-center mt-80"><span className="loading loading-bars loading-lg"></span></div>
    }
    const location=useLocation()
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to='/login' replace></Navigate>
};

export default PrivateRoute;
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../slices/authSlice";



const PrivateRoute = () => {
  const {userInfo} = useSelector(selectCurrentUser)

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute

import { useLocation,Navigate,Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
function RequiredAuth() {
    const {auth} =useAuth()
    const location = useLocation()
  return (
   auth?.role? <Outlet/>: <Navigate to="/login" state={{from:location}} replace/>
  )
}

export default RequiredAuth

import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


function ProtectedRoute({children}) {

  const user = useSelector((state) => {
    return state.user.user
  })

  if(!user) {
    return <Navigate to={'/'}/>
  }
                    
  return children ? children : <Outlet />
}

export default ProtectedRoute


import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


function ProtectedRoute({children}) {

  const user = useSelector((state) => {
    return state.user.user
  })

  
  



  if(!user) {
    return <Navigate to={'/'}/>
  }
                    

  console.log('this is the protected')
  return children ? children : <Outlet />
}

export default ProtectedRoute


/* 


<Stack spacing={3}>
  <Skeleton variant="text" sx={{ fontSize: '4rem'}} />
  <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center'}}>
    <Skeleton variant="rectangular" width='80%' height={60} />
    <Skeleton variant="rounded" width='80%' height={60} />
    <Skeleton variant="rounded" width='80%' height={60} />
    <Skeleton variant="rounded" width='80%' height={60} />
  </Box>
</Stack> 


*/
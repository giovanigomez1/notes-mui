import Home from "./components/Home"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import NoteList from "./components/NoteList";
import NotesForm from "./components/NotesForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Note from "./components/Note";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { checkUserLogged } from "./store";
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ing.GGP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function App() {

  const {user, checkingUser} = useSelector((state) => {
    return {
      user: state.user.user,
      checkingUser: state.user.checkingUser
    }
  })

  

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUserLogged())
    
  }, [])

  console.log(checkingUser)
  console.log(user)


  return (
    <div>
        <BrowserRouter>
        <NavBar />
          <Container sx={{marginY: 3}}>
            <Routes>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/forgot_password" element={<ForgotPassword />}/>
              <Route index path="/" element={checkingUser ? 
                <Stack spacing={1}>
                  <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
                  <Box sx={{display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', marginTop: '4rem !important', marginBottom: '2rem !important'}}>
                    <Skeleton variant="rectangular" width='80%' height={70} />
                    <Skeleton variant="rounded" width='80%' height={70} />
                    <Skeleton variant="rounded" width='80%' height={70} />
                    <Skeleton variant="rounded" width='80%' height={70} />
                  </Box>
                </Stack> 
                : user ? 
                <Navigate to={'/dashboard'} /> : <Login />}/>
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <Fragment>
                    <Box sx={{ marginBottom: 2}}>
                      <Typography variant='h4' component="h1" sx={{textAlign: 'center'}}>
                        {`${user ? `Welcome ${(user.firstName).slice(0,1).toUpperCase() + user.firstName.slice(1)}` : ''}`}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center'}}>
                        <NoteList/>
                      </Grid>
                      <Grid item xs={12} sm={6} md={8} sx={{textAlign: 'center' }}>
                        <Routes>
                          <Route path="/" element={<Home />}/>
                          <Route path="/form" element={<NotesForm /> }/>
                          <Route path="/note/:title" element={<Note />}/>
                        </Routes>
                      </Grid>
                    </Grid>  
                  </Fragment>
                </ProtectedRoute>
              } />
            </Routes>
          </Container>
        </BrowserRouter>
        <Box sx={{marginTop: 15}}>
          <Copyright sx={{ mt: 1, mb: 2 }}/>
        </Box>
    </div>
  )
}



export default App
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import Alert from '@mui/material/Alert';
import { resetLoginFailMsj } from '../store';
import LoadingButton from '@mui/lab/LoadingButton';


const theme = createTheme();

export default function Login() {

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  

  const {logingFailed, loadingLogin, tooManyRequests } = useSelector((state) => {
    return {
      logingFailed: state.user.logingFailed,
      loadingLogin: state.user.loadingLogin,
      tooManyRequests: state.user.tooManyRequests
    }    
  })


  useEffect(() => {
    
    if(tooManyRequests) {
      setMessage(tooManyRequests)
      setShowMessage(true)
      timer()
    } else if(logingFailed) {
      setMessage('Incorrect email or password!')
      setShowMessage(true)
      timer()
    }
    else {
      setMessage('')
      setShowMessage(false)
    }
  }, [logingFailed, tooManyRequests])



  const timer = () => setTimeout(() => {
    setShowMessage(false)
  }, process.env.REACT_APP_TIMER);


  const disableLogingMsj = () => {
    dispatch(resetLoginFailMsj())
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(isEmpty(data.get('password'))) {
      setShowMessage(true)
      setMessage('Password cannot be empty!')
      timer()
      return
    }
    if(!isEmail(data.get('email'))) {
      setShowMessage(true)
      setMessage('Please provide a valid email!')
      timer()
      return
    }
    dispatch(loginUser({
      email: data.get('email'),
      password: data.get('password'),
    })) 
  };


  return ( 
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {showMessage ? <Alert severity="warning">{message}</Alert> : ''}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                loading={loadingLogin}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>Sing In</span>
              </LoadingButton>
              
              <Grid container>
                <Grid item xs>
                  <Link to={'/forgot_password'} variant="body2" component={RouterLink}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={'/signup'} variant="body2" component={RouterLink} onClick={disableLogingMsj}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
  );
}
import { useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../store';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { resetLoginFailMsj } from '../store';



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

const theme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch()
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


  const timer = () => setTimeout(() => {
    setShowMessage(false)
  }, 3000);


  const {user, loadingSignup, creatingUserErrorMsj} = useSelector((state) => {
    return {
      user: state.user.user,
      loadingSignup: state.user.loadingSignup, 
      creatingUserErrorMsj: state.user.creatingUserErrorMsj
    }
  })

  
  console.log(creatingUserErrorMsj)
  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }
    if(creatingUserErrorMsj){
      setMessage(creatingUserErrorMsj)
      setShowMessage(true)
      timer()
    }
  }, [user, creatingUserErrorMsj])


  const disabelErrorMsj = () => {
    dispatch(resetLoginFailMsj())
  }


  console.log(user)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(isEmpty(data.get('firstName')) || 
        isEmpty(data.get('lastName')) ||
        isEmpty(data.get('password')) || 
        isEmpty(data.get('passwordConfirm')))
      {
      setShowMessage(true)
      setMessage('Please complete all the fields to continue!')
      timer()
      return 
    }
    if(data.get('password') !== data.get('passwordConfirm')) {
      setShowMessage(true)
      setMessage('Password and password confirm are not the same!')
      timer()
      return 
    }
    if(!isEmail(data.get('email'))) {
      setShowMessage(true)
      setMessage('Please provide a valid email!')
      timer()
      return
    }

    dispatch(signUpUser({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm')
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
            Sign up
          </Typography>
          {showMessage ? <Alert severity="warning">{message}</Alert> : ''}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password Confirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> */}
            <LoadingButton
                loading={loadingSignup}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              <span>Sign Up</span>
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/'} component={RouterLink} onClick={disabelErrorMsj}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
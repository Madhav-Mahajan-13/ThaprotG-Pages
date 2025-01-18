import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme.jsx';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MyContext } from '../context/context.jsx';
import { toast,ToastContainer } from 'react-toastify';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {

  const navigate = useNavigate();
  const [check,setCheck] = useState(false);
  const {toastOptions} = React.useContext(MyContext);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value;
    if(email.length < 8){
      // Implement Error showing;
      toast.error("Incorrect Email",toastOptions);
      return;
    }

    const password = document.getElementById('password').value;
    if(password.length < 8){
      //Implement Error showing;
      toast.error("Invalid Password",toastOptions);
      return;
    }

    const res = await fetch('http://localhost:80/api/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })

    const data = await res.json();

    if(!data.success){
      toast.error(data.msg,toastOptions);
      return;
    }

    if(data.otp){
      setTimeout(() => {
        navigate(`/otp/${data.authToken}/${email}`);
      },800);

      return;
    }

    else{

      if(check){
        localStorage.setItem('authToken',data.authToken);
      }
      else{
        sessionStorage.setItem('authToken',data.authToken);
      }

      setTimeout(() => {
        navigate("/");
      },500);
    }

  }

  return (
    // <AppTheme {...props}>
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ToastContainer/>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <span>
                <Link
                  to="/forgot"
                  component="button"
                  type="button"
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forgot your password ?
                </Link>
                </span>
              </Box>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              onClick={() => {
                check?setCheck(false):setCheck(true);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link
                 to="/register"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}

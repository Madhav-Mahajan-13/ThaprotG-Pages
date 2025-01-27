import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function SignUp(props) {

  const date = new Date();
  const navigate = useNavigate();
  const {toastOptions,backendHost,authToken} = React.useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    try {

      const name = document.getElementById('name').value;
      if(name.length < 2){
        // Implement error showing
        toast.error("Name cannot be less than 2 words",toastOptions);
        return;
      }

      const degree = document.getElementById('degree').value;
      if(degree.length <= 1){
        // Implement Error showing
        toast.error("Give Valid Degree",toastOptions);
        return;
      }

      const year = Number(document.getElementById('graduation').value);
      if(year > date.getFullYear() + 10 || year < 1947){
        // Implement Error showing
        toast.error("Invalid Year",toastOptions);
        return;
      }

      const email = document.getElementById('email').value;
      if(email.length < 11){
        // Implement Error showing
        toast.error("Invalid Email",toastOptions);
        return;
      }

      const domain = email.slice(-10);
      if(domain != 'thapar.edu'){
        // Implement Error showing
        toast.error("Please use thapar.edu email",toastOptions);
        return;
      }

      const password = document.getElementById('password').value;
      if(password.length < 3){
        // Implement Error showing
        toast.error("Invalid Password Length",toastOptions);
        return;
      }

      const data = await fetch(backendHost + '/api/auth/register',{
        method:"POST",
        body:JSON.stringify({
          name : name,
          email : email,
          password : password,
          degree : degree,
          year : year
        }),
        headers:{
          "Content-Type":"application/json"
        },
        }
      )

      const res = await data.json();
      if(!res.success){
        toast.error(res.msg,toastOptions);
        return;
      }

      setTimeout(() => {
        toast.success("Redirecting!!!",toastOptions);
        navigate(`/otp/${res.authToken}/${email}`);
      },800);

    } catch (error) {
      toast.error(error.message,toastOptions);
    }
  }
  useEffect(()=>{
      const token1 = localStorage.getItem('authToken');
      const token2 = sessionStorage.getItem('authToken');
  
      const token = token1?token1:token2;
  
      if(token || authToken){
          navigate("/");
      }
    },[])

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ToastContainer/>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign Up
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
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                autoComplete="text"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                sx={{ ariaLabel: 'name' }}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="degree">Degree</FormLabel>
              <TextField
                id="degree"
                type="text"
                name="degree"
                placeholder=""
                autoComplete="text"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                sx={{ ariaLabel: 'name' }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="graduation">Graduation Year</FormLabel>
              <TextField
                id="graduation"
                type="number"
                name="graduation"
                placeholder=""
                autoComplete="text"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                sx={{ ariaLabel: 'name' }}
              />
            </FormControl>

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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
          <Divider>or</Divider>
          <Typography sx={{ textAlign: 'center' }}>
              <span>
                <Link
                  to="/login"
                  className='text-decoration-none'
                >
                Already have an account ?
                </Link>
              </span>
            </Typography>
        </Card>
      </SignInContainer>
      </AppTheme>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme.jsx';
import { toast, ToastContainer } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect,useContext } from "react";
import { MyContext } from '../context/context.jsx';


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
  
  const EmailContainer = styled(Stack)(({ theme }) => ({
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

export default function Forgot(props) {
    const navigate = useNavigate();
    const {toastOptions,backendHost} = useContext(MyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const email = document.getElementById('email').value;
          console.log("HERE");
          const [left,right] = email.split('@');
          if(left < 3 || right != 'thapar.edu'){
              toast.info("Not a Valid thapar.edu account",toastOptions)
              return;
          }

          const res = await fetch(backendHost + '/api/auth/forgot',{
              method:"POST",
              body:JSON.stringify({
                  email : email
              }),
              headers:{
                  "Content-Type":"application/json"
              },
              credentials:"include"
          })

          const data = await res.json();

          if(!data.success){
              console.log(data.msg)
              toast.error(data.msg,toastOptions);
              return;
          }

          toast.success("Redirecting")
          setTimeout(() => {
              sessionStorage.setItem('isForgot','yes');
              navigate(`/OTP/${data.token}/${email}`);
          },1000)

      } catch (error) {
          toast.error(error.message,toastOptions);
          console.log(error.message)
      }
    }

    return(
        <>
        <ToastContainer/>
        <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <EmailContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {<>
          <Typography
            component="h1"
            variant="h5"
            sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.75rem)' }}
          >
            Enter Your Email ID
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

              <TextField
                name="email"
                placeholder="enter email"
                
                id="email"
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
              Submit
            </Button>
          </Box>
          </>
          }
          
        </Card>
      </EmailContainer>
    </AppTheme>
    </>
    )
}
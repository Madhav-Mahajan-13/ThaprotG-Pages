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
import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect,useContext } from "react";
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
  
  const passContainer = styled(Stack)(({ theme }) => ({
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

export default function Reset(props) {
    const {email} = useParams();

    const navigate = useNavigate();
    const {toastOptions,backendHost} = useContext(MyContext);

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const pass = document.getElementById('password').value;
            if(pass < 8){
                toast.info("password must be of at least 8 characters",toastOptions)
                return
            }

            const cpass = document.getElementById('cpassword').value;
            if(cpass < 8){
                toast.info("password must be of at least 8 characters",toastOptions)
                return
            }

            if(pass != cpass){
                toast.error("Both fields must be same",toastOptions);
                return;
            }

            const res = await fetch(backendHost + '/api/auth/reset',{
                method:"POST",
                body:JSON.stringify({
                    email : email,
                    pass : pass,
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await res.json();

            if(!data.success){
                toast.error(data.msg,toastOptions);
                return;
            }
            toast.success("Success, Redirecting");
            setTimeout(() => {
                navigate('/login');
            },1000);

        } catch (error) {
            toast.error(error.message,toastOptions)
        }

    }
    return(
        <>
        <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ToastContainer/>
      <passContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <>
          <Typography
            component="h1"
            variant="h5"
            sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.75rem)' }}
          >
            Enter new password to set
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
                name="pass"
                placeholder="••••••"
                type='password'
                id="password"
                autoComplete="new password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
              />
              <TextField
                name="rePass"
                placeholder="••••••"
                type='password'
                id="cpassword"
                autoComplete="retype new password"
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
        </Card>
      </passContainer>
    </AppTheme>
    </>
    )
}
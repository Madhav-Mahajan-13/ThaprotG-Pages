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

import {Audio} from 'react-loader-spinner';

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
  
  const OTPContainer = styled(Stack)(({ theme }) => ({
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

export default function OTP(props) {
  const navigate = useNavigate();
const { token, email } = useParams(); // Get token & email from URL
const { backendHost, toastOptions } = React.useContext(MyContext);
const [isLoading, setLoading] = useState(true);
const [otp, setOTP] = useState("");

const forgot = sessionStorage.getItem("isForgot");

useEffect(() => {
    async function API_Call() {
        try {
            const res = await fetch(`${backendHost}/api/auth/otp/${email}`, {
                headers: {
                    authToken: token, // Send token in headers
                },
                method: "POST",
                credentials: "include",
            });

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } catch (error) {
            toast.error(error.message);
        }
    }

    API_Call();
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length < 6) {
        toast.error("Invalid OTP length", toastOptions);
        return;
    }

    try {
        const res = await fetch(`${backendHost}/api/auth/verify/${email}`, {
            method: "POST",
            body: JSON.stringify({ otp }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!data.success) {
            toast.error(data.msg, toastOptions);
            return;
        }

        toast.success("OTP Verified! Redirecting...", toastOptions);

        setTimeout(() => {
            sessionStorage.setItem("otpToken", token); // 🔥 Store token for reset route
            sessionStorage.removeItem("isForgot"); // Remove forgot flag

            navigate(`/passreset/${token}/${email}`); // Navigate to reset password
        }, 1500);
    } catch (e) {
        toast.error(e.message, toastOptions);
    }
  }

    return(
        <>
        <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ToastContainer/>
      <OTPContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {isLoading?<Audio/>:<>
          <Typography
            component="h1"
            variant="h5"
            sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.75rem)' }}
          >
            Enter OTP sent to {email}
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
                name="OTP"
                placeholder="••••••"
                type='text'
                id="OTP"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
                onChange={(e) => {setOTP(e.target.value)}}
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
      </OTPContainer>
    </AppTheme>
    </>
    )
}
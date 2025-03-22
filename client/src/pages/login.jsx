import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/context.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";
import AppTheme from '../theme/AppTheme.jsx';
import '../styling/login.css'; // Import the CSS file

export default function SignIn(props) {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toastOptions, backendHost, setUserId, setIsAlum } = useContext(MyContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    if (email.length < 8) {
      toast.error("Incorrect Email", toastOptions);
      return;
    }

    const password = document.getElementById('password').value;
    if (password.length < 8) {
      toast.error("Invalid Password", toastOptions);
      return;
    }

    const res = await fetch(`${backendHost}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",  // Allow cookies to be sent with requests
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.msg, toastOptions);
      return;
    }

    if (data.otp){
      setTimeout(() => {
        navigate(`/otp/${email}`);
      }, 800);
      return;
    }

    await setUserId(data.id);
    await setIsAlum(data.is_alum);

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${backendHost}/api/auth/verifyToken`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    checkAuth();
  }, [backendHost, navigate]);

  return (
    <AppTheme {...props}>
      <ToastContainer />
      <div className="sign-in-container">
        <div className="waves-background"></div>
        <div className="login-card">
          <div className="logo-box">
            <div className="logo-text">ThaProt-G</div>
          </div>
          
          <h1 className="welcome-heading">Welcome Back</h1>
          
          <p className="welcome-subheading">
            Connect with students and alumni to collaborate on projects
          </p>
          
          <form className="login-form" noValidate>
            <div className="form-control">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="text-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>
            </div>
            
            <div className="form-control">
              <div className="password-header">
                <label className="form-label" htmlFor="password">Password</label>
                <Link
                  to="/forgot"
                  className="forgot-link"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="text-field password-field">
                <input
                  name="password"
                  placeholder="••••••"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={handleClickShowPassword}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remember"
                className="checkbox"
                onChange={() => setCheck(!check)}
              />
              <label htmlFor="remember" className="checkbox-label">
                Remember me
              </label>
            </div>
            
            <button
              type="submit"
              className="login-button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            
            <p className="signup-text">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="signup-link"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AppTheme>
  );
}
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from '../context/context.jsx';
import { toast, ToastContainer } from 'react-toastify';
import AppTheme from '../theme/AppTheme.jsx';
import '../styling/reset.css'; // Import the CSS file

export default function Reset(props) {
  const navigate = useNavigate();
  const { email } = useParams();
  const { toastOptions, backendHost } = useContext(MyContext);
  const token = sessionStorage.getItem("otpToken"); // 🔥 Retrieve OTP token
  
  async function handleSubmit(e) {
    e.preventDefault();
  
    const pass = document.getElementById("password").value;
    const cpass = document.getElementById("cpassword").value;
  
    if (pass.length < 8 || cpass.length < 8) {
      toast.info("Password must be at least 8 characters", toastOptions);
      return;
    }
  
    if (pass !== cpass) {
      toast.error("Both password fields must be the same", toastOptions);
      return;
    }
  
    if (!token) {
      toast.error("Session expired. Please request a new OTP.", toastOptions);
      navigate("/forgot");
      return;
    }
  
    try {
      const res = await fetch(`${backendHost}/api/auth/reset`, {
        method: "POST",
        body: JSON.stringify({ email, pass, authToken: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (!data.success) {
        toast.error(data.msg, toastOptions);
        return;
      }
  
      toast.success("Password reset successful! Redirecting...");
  
      setTimeout(() => {
        sessionStorage.removeItem("otpToken"); // 🔥 Clear OTP token
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  }

  return (
    <AppTheme {...props}>
      <ToastContainer />
      <div className="reset-container">
        <div className="reset-card">
          <div className="lock-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm-6 8h12v10H6V11z"/>
            </svg>
          </div>

          <h1 className="reset-heading">Reset Your Password</h1>
          
          <form className="reset-form" noValidate onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="password-field">
                <input
                  name="pass"
                  placeholder="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  autoFocus
                  required
                />
              </div>
              
              <div className="password-field">
                <input
                  name="rePass"
                  placeholder="Confirm New Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="reset-button"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </AppTheme>
  );
}
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from '../context/context.jsx';
import { toast, ToastContainer } from "react-toastify";
import AppTheme from '../theme/AppTheme.jsx';
import '../styling/forgot.css'; // Import the CSS file

export default function Forgot(props) {
  const navigate = useNavigate();
  const { toastOptions, backendHost } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value.trim();
      const [left, right] = email.split("@");

      if (left.length < 3 || right.toLowerCase() !== "thapar.edu") {
        toast.info("Not a valid thapar.edu account", toastOptions);
        return;
      }

      const res = await fetch(backendHost + "/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent
      });

      const data = await res.json();

      if (!data.success) {
        console.log(data.msg);
        toast.error(data.msg, toastOptions);
        return;
      }

      toast.success("Redirecting...");

      sessionStorage.setItem("otpToken", data.otpToken);

      setTimeout(() => {
        navigate(`/OTP/${data.otpToken}/${email}`);
      }, 1000);
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  }

  return (
    <AppTheme {...props}>
      <ToastContainer />
      <div className="forgot-container">
        <div className="forgot-card">
          <div className="envelope-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>

          <h1 className="forgot-heading">Forgot Password?</h1>
          
          <p className="forgot-subheading">
            Enter your Thapar email address and we'll send you a reset code
          </p>
          
          <form className="forgot-form" noValidate onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="text-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@thapar.edu"
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="forgot-button"
            >
              Send Reset Code
            </button>
          </form>
          
          <div className="back-link-container">
            <Link to="/login" className="back-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </AppTheme>
  );
}
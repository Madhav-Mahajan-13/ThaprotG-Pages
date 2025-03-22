import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MyContext } from '../context/context.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { Audio } from 'react-loader-spinner';
import AppTheme from '../theme/AppTheme.jsx';
import '../styling/otp.css'; // Import the CSS file

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
  }, [backendHost, email, token]);

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
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  }

  return (
    <AppTheme {...props}>
      <ToastContainer />
      <div className="otp-container">
        <div className="otp-card">
          {isLoading ? (
            <div className="loader-container">
              <Audio />
            </div>
          ) : (
            <>
              <h1 className="otp-heading">
                Enter OTP sent to <span className="otp-email">{email}</span>
              </h1>
              <form className="otp-form" noValidate onSubmit={handleSubmit}>
                <div className="form-control">
                  <div className="text-field">
                    <input
                      name="OTP"
                      placeholder="••••••"
                      type="text"
                      id="OTP"
                      autoComplete="one-time-code"
                      autoFocus
                      required
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="otp-button"
                >
                  Verify OTP
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </AppTheme>
  );
}
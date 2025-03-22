import * as React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/context.jsx';
import { toast, ToastContainer } from 'react-toastify';
import AppTheme from '../theme/AppTheme.jsx';
import '../styling/register.css'; // Import the CSS file

export default function SignUp(props) {
  const date = new Date();
  const navigate = useNavigate();
  const { toastOptions, backendHost } = React.useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const name = document.getElementById('name').value;
      if (name.length < 2) {
        toast.error("Name cannot be less than 2 words", toastOptions);
        return;
      }

      const degree = document.getElementById('degree').value;
      if (degree.length <= 1) {
        toast.error("Give Valid Degree", toastOptions);
        return;
      }

      const year = Number(document.getElementById('graduation').value);
      if (year > date.getFullYear() + 10 || year < 1947) {
        toast.error("Invalid Year", toastOptions);
        return;
      }

      const email = document.getElementById('email').value;
      if (email.length < 11) {
        toast.error("Invalid Email", toastOptions);
        return;
      }

      const domain = email.slice(-10);
      if (domain != 'thapar.edu') {
        toast.error("Please use thapar.edu email", toastOptions);
        return;
      }

      const password = document.getElementById('password').value;
      if (password.length < 8) {
        toast.error("Invalid Password Length", toastOptions);
        return;
      }

      const data = await fetch(backendHost + '/api/auth/register', {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          degree: degree,
          year: year
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      }
      );

      const res = await data.json();
      if (!res.success) {
        toast.error(res.msg, toastOptions);
        return;
      }

      setTimeout(() => {
        toast.success("Redirecting!!!", toastOptions);
        navigate(`/otp/${res.authToken}/${email}`);
      }, 800);
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendHost}/api/auth/verifyToken`, {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          navigate("/");
        } else {
          console.warn("Authentication failed:", data.msg);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    checkAuth();
  }, [navigate, backendHost]);

  return (
    <AppTheme {...props}>
      <ToastContainer />
      <div className="register-container">
        <div className="register-card">
          <h1 className="register-heading">Sign Up</h1>
          
          <form className="register-form" noValidate onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="form-label" htmlFor="name">Name</label>
              <div className="text-field">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  autoComplete="name"
                  autoFocus
                  required
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="form-label" htmlFor="degree">Degree</label>
              <div className="text-field">
                <input
                  id="degree"
                  type="text"
                  name="degree"
                  placeholder="B.Tech, M.Tech, etc."
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="form-label" htmlFor="graduation">Graduation Year</label>
              <div className="text-field">
                <input
                  id="graduation"
                  type="number"
                  name="graduation"
                  placeholder="2025"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="form-label" htmlFor="email">Email</label>
              <div className="text-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@thapar.edu"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="text-field password-field">
                <input
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="register-button"
            >
              Register
            </button>
          </form>
          
          <div className="divider">or</div>
          
          <p className="login-link-text">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AppTheme>
  );
}
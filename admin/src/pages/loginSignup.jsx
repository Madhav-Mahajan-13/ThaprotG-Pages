/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { MyContext } from "../context/myContext";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendHost, toastOptions } = useContext(MyContext);
  const [hidden, setHidden] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(backendHost + '/api/admin/loginAdmin',{
          method:"POST",
          body:JSON.stringify({
            email : email,
            password : password
          }),
          headers:{
            "Content-Type" : 'application/json'
          },
          "credentials" : "include"
        });

        const data = await res.json();
        if(!data.success){
          toast.error(data.message,toastOptions);
        }
        else{
          toast.success("Authentication Successful",toastOptions)
          setTimeout(() => {
            navigate('/');
          },1000);
        }

    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Login to your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
              <input
                type="email"
                placeholder="Your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </label>
          </div>
          <div className="mt-4 relative">
            <label className="block" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={!hidden ? "text" : "password"}
                placeholder="Your password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setHidden(!hidden)}
              >
                {!hidden ? "hide" : "show"}
              </button>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Login
            </button>
            <Link to='/forgot'>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot Password ?
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

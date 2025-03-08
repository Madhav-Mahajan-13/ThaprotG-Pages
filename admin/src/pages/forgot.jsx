/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { MyContext } from "../context/myContext";

export default function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { backendHost, toastOptions } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(backendHost + '/api/admin/forgotPassword',{
          method:"POST",
          body:JSON.stringify({
            email : email,
          }),
          headers:{
            "Content-Type" : 'application/json'
          }
        });

        const data = await res.json();
        if(!data.success){
          toast.error(data.message,toastOptions);
        }
        else{
          toast.success("OTP SENT TO EMAIL",toastOptions)
          setTimeout(() => {
            navigate(`/OTP/${email}`);
          },1000);
        }

    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Enter your email
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
              <input
                type="email"
                placeholder="Your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
          </div>
          <button type="submit" className='bg-blue-500 mt-5 px-4 py-1 text-white'>Submit</button>
        </form>
      </div>
    </div>
  );
}

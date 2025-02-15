/* eslint-disable no-unused-vars */
import {useContext, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import {toast, ToastContainer} from "react-toastify";
import {MyContext} from "../context/myContext";

export default function OTP() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const {backendHost, toastOptions} = useContext(MyContext);
  const [hidden, setHidden] = useState(true);
  const {email} = useParams();

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(backendHost + '/api/admin/verifyOTP', {
        method: "POST",
        body: JSON.stringify({
          email:email,
          otp: otp
        }),
        headers: {
          "Content-Type": 'application/json'
        }
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message, toastOptions);
      } else {
        toast.success("OTP VERIFICATION DONE", toastOptions)
        setHidden(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    try {
      if(pass != cPass){
        toast.info("Passwords do not match",toastOptions);
        return;
      }

      const res = await fetch(backendHost + '/api/admin/resetPassword',{
        body:JSON.stringify({
          email : email,
          password : pass
        }),
        headers:{
          "Content-Type" : "application/json"
        },
        method:"POST"
      })

      const data = await res.json();
      if(!data.success){
        toast.error(data.message,toastOptions);
      }
      else{
        toast.success(data.message + '... Redirecting',toastOptions);
        setTimeout(() => {
          navigate('/login')
        },1000)
      }

    }
    catch(e){
      toast.error(e.message,toastOptions);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer/>
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        {hidden &&
          <>
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Enter OTP sent to Email
            </h3>
            <form onSubmit={handleOTPSubmit}>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="OTP"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <button type="submit" className='bg-blue-500 mt-5 px-4 py-1 text-white'>Submit</button>
            </form>
          </>
        }
        {
          !hidden && <>
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Enter new password
            </h3>
            <form onSubmit={handlePassSubmit}>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="password"
                  id="pass"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="confirm password"
                  id="cpass"
                  value={cPass}
                  onChange={(e) => setCPass(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <button type="submit" className='bg-blue-500 mt-5 px-4 py-1 text-white'>Submit</button>
            </form>

          </>
        }
      </div>
    </div>
  );
}

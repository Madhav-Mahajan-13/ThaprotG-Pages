import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useNavigate,useLocation } from "react-router-dom";
import { useContext, useEffect} from "react"
import { MyContext } from "../context/context";
import socket from '../socket.js';
import {ToastContainer,toast} from "react-toastify";
const Landing = () => {

    const navigate = useNavigate();
    const {backendHost,userId,setUserId,toastOptions,setUserType} = useContext(MyContext);
    const location = useLocation();

    socket.on('suspend',async (msg) => {
        if(msg.id == userId){
            const res = await fetch(backendHost + '/api/auth/logout',{
                'credentials' : 'include',
                'method' : 'POST'
            })

            const data = await res.json();

            if(!data.success){
                toast.error(data.message,toastOptions);
            }
            else{
                toast.info("You have been suspended.....Redirecting",toastOptions)
            }
            setTimeout(() => {
                navigate('/login');
            },1000)
        }
    })

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${backendHost}/api/auth/verifyToken`, {
                    method: "POST",
                    credentials: "include", // 🔥 Ensures cookies are sent
                });

                const data = await response.json();

                await setUserId(data.id);

                if (!data.success) {
                    toast.info("NOT AUTHENTICATED",toastOptions);
                    navigate("/login"); // ❌ Not authenticated, redirect to login
                }
            } catch (error) {
                toast.error(error.message,toastOptions);
                navigate("/login"); // Redirect on error
            }
        };

        checkAuth();
    },[location.pathname]);

    return ( 
        <div className="flex flex-row">
            <ToastContainer/>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}
 
export default Landing;
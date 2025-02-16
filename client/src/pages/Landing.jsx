import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useNavigate,useLocation } from "react-router-dom";
import { useContext, useEffect} from "react"
import { MyContext } from "../context/context";
import socket from '../socket.js';
import {ToastContainer,toast} from "react-toastify";
const Landing = () => {

    const navigate = useNavigate();
    const {backendHost,userId,setUserId,toastOptions,setIsAlum} = useContext(MyContext);
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
                    credentials: "include",
                });

                const data = await response.json();

                await setUserId(data.id);
                await setIsAlum(data.user_type == 'alumni');

                if (!data.success) {
                    toast.info("NOT AUTHENTICATED",toastOptions);
                    navigate("/login");
                }
            } catch (error) {
                toast.error(error.message,toastOptions);
                navigate("/login");
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
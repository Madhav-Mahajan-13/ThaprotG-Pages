import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import { useContext, useEffect } from "react";
import { MyContext } from "../context/myContext";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Landing(){
    const {backendHost,toastOptions,setUserType} = useContext(MyContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            const API_CALL = async () => {
                const res = await fetch(backendHost + '/api/admin/verifyToken', {
                    credentials: 'include',
                });
    
                const data = await res.json();
                if (!data.success) {
                    toast.error(data.message, toastOptions);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                } else {
                    setUserType(data.user_type);
                }
            };
    
            API_CALL();
        }, 2000); // 2 seconds delay
    
        // Cleanup in case the component unmounts or location changes before timeout
        return () => clearTimeout(timeout);
    }, [location.pathname]);
    

    return(
        <div className="flex flex-col md:flex-row gap-x-2 gap-y-10 h-screen">
            <ToastContainer/>
            <Sidebar/>
            <TopBar/>
            <main className="overflow-auto flex-grow-1">
            <Outlet/>
            </main>
        </div>
    )
}
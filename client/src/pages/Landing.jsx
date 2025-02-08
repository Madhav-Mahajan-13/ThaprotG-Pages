import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect,useState } from "react"
import { MyContext } from "../context/context";
const Landing = () => {

    const navigate = useNavigate();
    const {backendHost} = useContext(MyContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${backendHost}/api/auth/verifyToken`, {
                    method: "POST",
                    credentials: "include", // 🔥 Ensures cookies are sent
                });

                const data = await response.json();

                if (!data.success) {
                    navigate("/login"); // ❌ Not authenticated, redirect to login
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                navigate("/login"); // Redirect on error
            }
        };

        checkAuth();
    }, [navigate]);

    return ( 
        <div className="flex flex-row">
            <Sidebar/>
            <Outlet/>
        </div>
    );
}
 
export default Landing;
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect,useState } from "react"
import { MyContext } from "../context/context";
const Landing = () => {

    const navigate = useNavigate();
    const {userId,isAlum,authToken} = useContext(MyContext);

    useEffect(() => {
        const token1 = localStorage.getItem('authToken');
        const token2 = sessionStorage.getItem('authToken');

        const token = token1?token1:token2;

        if(!token && !(authToken)){
            navigate("/login");
        }   
    },[])

    return ( 
        <div className="">
            <Sidebar/>
            <Outlet/>
        </div>
    );
}
 
export default Landing;
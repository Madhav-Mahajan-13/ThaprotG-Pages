import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
const Landing = () => {
    return ( 
    <> 
        <Sidebar/>
        <Outlet/>
    </> 
    );
}
 
export default Landing;
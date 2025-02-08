import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar";

export default function Landing(){
    return(
        <div className="flex flex-row gap-x-2">
            <Sidebar/>
            <Outlet/>
        </div>
    )
}
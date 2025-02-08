import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";

export default function Landing(){
    return(
        <div className="flex flex-row gap-x-2">
            <Sidebar/>
            <TopBar/>
            <Outlet/>
        </div>
    )
}
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";

export default function Landing(){
    return(
        <div className="flex flex-col md:flex-row gap-x-2 gap-y-10 h-screen">
            <Sidebar/>
            <TopBar/>
            <main className="overflow-auto flex-grow-1">
            <Outlet/>
            </main>
        </div>
    )
}
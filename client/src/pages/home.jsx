import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import SearchInterface from "../components/searchInterface";

export default function Home(){
    
    const navigate = useNavigate();

    useEffect(() => {
        const token1 = localStorage.getItem('authToken');
        const token2 = sessionStorage.getItem('authToken');

        const token = token1?token1:token2;

        if(!token){
            navigate("/login");
        }   
    },[])

    return(
        <div className="flex flex-col">
            <SearchInterface/>
        </div>
    )
}
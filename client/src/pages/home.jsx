import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";

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
        <>
        <h1>Hello World</h1>
        </>
    )
}
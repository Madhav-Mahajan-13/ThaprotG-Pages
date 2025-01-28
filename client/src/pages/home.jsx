import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import SearchInterface from "../components/SearchInterface_2";
import Carousel from "../components/Carousel";
import InternshipPlacement from "../components/InternshipPlacement";
import Scholarship from "../components/Scholarship";
import "../styling/home.css"
import Footer from "../components/Footer";
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

    // return(
    //     <div className="flex flex-col">
    //         <SearchInterface/>
    //     </div>
        
    // )
    return (
        <div className="home">

          <div className="main-content">
            <SearchInterface/>

            <Carousel />
            <div className="sections-container">
              <InternshipPlacement />
              <Scholarship />
            </div>
          </div>
            <Footer/>
        </div>
      )
}
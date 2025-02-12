import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import SearchInterface from "../components/SearchInterface_2";
// import Carousel from "../components/Carousel";
import DynamicCarousel from "../components/Carousel";
import InternshipPlacement from "../components/InternshipPlacement";
import Scholarship from "../components/Scholarship";
import "../styling/home.css"
import Footer from "../components/Footer";
import { useContext } from "react";
import { MyContext } from "../context/context";
import CampusEvents from "../components/Events";
export default function Home(){
    
    const navigate = useNavigate();
    const {backendHost} = useContext(MyContext);

    return (
        <div className="home">

          <div className="main-content">
            <SearchInterface/>

            <DynamicCarousel></DynamicCarousel>
            <CampusEvents></CampusEvents>
            <div className="sections-container">
              <InternshipPlacement />
              <Scholarship />
            </div>
          </div>
            <Footer/>
        </div>
      )
}
import React, { useState, useEffect } from "react"
// import "./Carousel.css"
import "../styling/Carousel.css"

const carouselData = [
  { id: 1, text: "Find internship opportunities", image: "https://picsum.photos/id/36/200/300" },
  { id: 2, text: "Discover scholarship programs", image: "https://picsum.photos/id/39/200/300" },
  { id: 3, text: "Connect with industry professionals", image: "https://picsum.photos/id/42/200/300" },
  { id: 4, text: "One on One chatting", image: "https://picsum.photos/id/45/200/300" },
  { id: 5, text: "Track your academic progress", image: "https://picsum.photos/id/48/200/300" },
]

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [prevSlide, setPrevSlide] = useState(carouselData.length - 1)
  
    useEffect(() => {
      const timer = setInterval(() => {
        setPrevSlide(currentSlide)
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length)
      }, 5000)
  
      return () => clearInterval(timer)
    }, [currentSlide])
  
    return (
      <div className="carousel">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? "active" : ""} ${index === prevSlide ? "prev" : ""}`}
          >
            <div className="slide-content">
              <img src={slide.image || "/placeholder.svg"} alt={`Use ${slide.id}`} />
              <p className="slide-text">{slide.text}</p>
            </div>
            <div className="torn-effect"></div>
          </div>
        ))}
        <div className="carousel-indicators">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => {
                setPrevSlide(currentSlide)
                setCurrentSlide(index)
              }}
            />
          ))}
        </div>
      </div>
    )
  }

export default Carousel


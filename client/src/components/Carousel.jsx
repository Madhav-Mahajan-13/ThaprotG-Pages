import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styling/Carousel.css";
import { useContext } from "react";
import { MyContext } from "../context/context";

const DynamicCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const{backendHost} = useContext(MyContext);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await fetch(backendHost + "/api/object/getCarousel");
        const data = await response.json();
        setSlides(data.data || []);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };
    fetchCarousel();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  return (
    <div className="carousel-container">
      {slides.length > 0 &&
        slides.map((slide, index) => (
          <a
            key={slide.id}
            href={slide.link}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={backendHost+slide.image_path} alt={slide.title} className="carousel-image" />
            <div className="carousel-overlay">
              <h2>{slide.title}</h2>
              <p>{slide.img_description}</p>
            </div>
          </a>
        ))}
      <button className="carousel-btn left" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
        <ChevronLeft />
      </button>
      <button className="carousel-btn right" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default DynamicCarousel;

import React, { useState, useEffect, useRef } from "react";
import "../styling/Events.css";

const CampusEvents = () => {
  const [events, setEvents] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/object/getEvent");
        const data = await response.json();
        setEvents([...data.data, ...data.data]); // Duplicate for seamless scrolling
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let scrollAmount = 0;
    const scrollSpeed = 1;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += scrollSpeed;
        scrollAmount += scrollSpeed;

        if (scrollAmount >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="events-container">
      <h2>Campus Around</h2>
      <div className="events-scroll" ref={scrollRef}>
        {events.map((event, index) => (
          <a 
            key={index} 
            href={event.link || "#"} 
            className="event-card" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={event.imgpath} alt={event.title} />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.event_description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CampusEvents;

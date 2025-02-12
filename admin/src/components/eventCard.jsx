/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function EventCard({ event }) {
    return (
        <div className="max-w-md rounded-lg shadow-lg border p-4 bg-white">
            <img src={event.imgpath} alt={event.title} className="w-full h-40 object-cover rounded-md"/>
            <h2 className="text-xl font-bold mt-2">{event.title}</h2>
            <p className="text-gray-600 text-sm">{event.event_description}</p>
            
            <div className="mt-2 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-md text-sm font-semibold 
                    ${event.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {event.status.toUpperCase()}
                </span>
                
                {event.link && (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" 
                        className="text-blue-500 text-sm font-medium underline">
                        View More
                    </a>
                )}
            </div>
            
            <div className="text-gray-500 text-xs mt-3">
                <p>Updated: {new Date(event.updated_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

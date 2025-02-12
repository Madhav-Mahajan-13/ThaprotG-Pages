/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function EventCard({ event,handleStatusChange,handleDelete }) {
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
                    <a href={event.link.startsWith('https://') ? event.link : `https://${event.link}`} target="_blank" rel="noopener noreferrer" 
                        className="text-blue-500 text-sm font-medium underline">
                        View More
                    </a>
                )}
            </div>
            
            <div className="text-gray-500 text-xs mt-3">
                <p>Updated: {new Date(event.updated_at).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-2 my-2 font-bold">
                {event.status == 'active' ?
                 <div className="bg-red-500 px-2 py-2 cursor-pointer" onClick={() => {handleStatusChange(event.id,event.status)}}>
                    Disable
                </div> 
                : 
                <div className="bg-green-400 px-2 py-2 cursor-pointer" onClick={() => {handleStatusChange(event.id,event.status)}}>
                    Enable
                </div>
                }
                <div className="bg-red-500 px-2 py-2 cursor-pointer" onClick={() => {handleDelete(event.id)}}>
                    Delete
                </div>
            </div>
        </div>
    );
}

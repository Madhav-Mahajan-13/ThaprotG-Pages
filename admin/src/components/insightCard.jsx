/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function InsightCard({ insight }) {
    return (
        <div className="max-w-md rounded-lg shadow-lg border p-4 bg-white">
            <img src={insight.imgsrc} alt={insight.tag} className="w-full h-40 object-cover rounded-md" />
            <p className="text-gray-600 text-sm mt-1">{insight.description}</p>
            
            <div className="text-gray-500 text-xs mt-3">
                <p>Uploaded: {new Date(insight.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

import React from "react"
import "../styling/Scholarship.css"

const Scholarship = () => {
  return (
    <div className="scholarship-container">
      {["Merit Based", "Need Based", "Sports", "Cultural","Merit Based", "Need Based", "Sports", "Cultural","Sports"].map((type) => (
        <div key={type} className="scholarship-card">
          <h3>{type} Scholarship</h3>
          <p>Financial support for deserving students.</p>
        </div>
      ))}
    </div>
  );
};

export default Scholarship


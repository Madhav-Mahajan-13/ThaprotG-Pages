import React from "react"
import "../styling/Scholarship.css"

const Scholarship = () => {
  return (
    <div className="scholarship">
      <h2>Scholarships</h2>
      <p>Explore various scholarship opportunities to support your education.</p>
      <ul>
        <li>
          <a href="#">Merit-based Scholarships</a>
        </li>
        <li>
          <a href="#">Need-based Financial Aid</a>
        </li>
        <li>
          <a href="#">Research Grants</a>
        </li>
        <li>
          <a href="#">International Student Scholarships</a>
        </li>
      </ul>
    </div>
  )
}

export default Scholarship


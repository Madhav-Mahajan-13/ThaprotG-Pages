import React from "react"
import "../styling/InternshipPlacement.css"

const InternshipPlacement = () => {
  const sections = [
    {
      title: "Internship",
      description: "Gain hands-on experience with top companies.",
      link: "#",
    },
    {
      title: "Placement",
      description: "Secure job opportunities in reputed firms.",
      link: "#",
    },
    {
      title: "Career Guide",
      description: "Get mentorship and career advice.",
      link: "#",
    },
    {
      title: "Internship",
      description: "Gain hands-on experience with top companies.",
      link: "#",
    },
    {
      title: "Placement",
      description: "Secure job opportunities in reputed firms.",
      link: "#",
    },
    {
      title: "Career Guide",
      description: "Get mentorship and career advice.",
      link: "#",
    },
  ];

  return (
    <div className="internship-placement">
      {sections.map((section) => (
        <div key={section.title} className="internship-card">
          <h3>{section.title}</h3>
          <p>{section.description}</p>
          <a href={section.link} className="learn-more">
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
};

export default InternshipPlacement;


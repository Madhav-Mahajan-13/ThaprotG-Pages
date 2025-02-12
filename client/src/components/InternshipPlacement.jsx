import React from "react";
import { ArrowRight, Briefcase, GraduationCap, Compass } from "lucide-react";
import "../styling/InternshipPlacement.css";

const InternshipPlacement = () => {
  const sections = [
    {
      title: "Internship",
      description: "Gain hands-on experience with top companies. Build your professional portfolio with real-world projects.",
      link: "https://www.google.com/search?q=internship+opportunities",
      icon: <Briefcase className="card-icon" />,
    },
    {
      title: "Placement",
      description: "Secure job opportunities in reputed firms. Connect with industry leaders and start your career journey.",
      link: "https://www.google.com/search?q=job+placements",
      icon: <GraduationCap className="card-icon" />,
    },
    {
      title: "Career Guide",
      description: "Get expert mentorship and career advice. Navigate your professional path with confidence.",
      link: "https://www.google.com/search?q=career+guidance",
      icon: <Compass className="card-icon" />,
    },
  ];

  return (
    <div className="internship-container">
      <div className="internship-grid">
        {sections.map((section) => (
          <div key={section.title} className="internship-card">
            <div className="icon-wrapper">
              {section.icon}
            </div>
            <h3 className="card-title">{section.title}</h3>
            <p className="card-description">{section.description}</p>
            <a 
              href={section.link} 
              className="learn-more-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
              <ArrowRight className="arrow-icon" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipPlacement;
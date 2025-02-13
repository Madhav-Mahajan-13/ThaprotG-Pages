import React from "react";
import { ArrowRight, Briefcase, GraduationCap, Compass } from "lucide-react";
import "../styling/InternshipPlacement.css";

const InternshipPlacement = () => {
  const sections = [
    {
      title: "Internship",
      description: "Gain hands-on experience with top companies. Build your professional portfolio with real-world projects.",
      link: "/internship",
      icon: <Briefcase className="card-icon" />,
    },
    {
      title: "Placement",
      description: "Secure job opportunities in reputed firms. Connect with industry leaders and start your career journey.",
      link: "/placement",
      icon: <GraduationCap className="card-icon" />,
    },
    {
      title: "Career Guide",
      description: "Get expert mentorship and career advice. Navigate your professional path with confidence.",
      link: "/placement",
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
import React from 'react';
import '../styling/Placementpage.css';

const Placements = () => {
  const placements = [
    {
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      description: "Full-time role developing enterprise-level applications using modern tech stack. Competitive package with great benefits.",
      link: "https://example.com/swe-role"
    },
    {
      title: "Product Designer",
      company: "Creative Labs",
      description: "Join our design team to create innovative digital products. Work with cross-functional teams in an agile environment.",
      link: "https://example.com/designer-role"
    },
    {
      title: "Data Analyst",
      company: "DataCorp",
      description: "Transform business data into actionable insights. Work with cutting-edge analytics tools and methodologies.",
      link: "https://example.com/analyst-role"
    },
    {
      title: "Business Development",
      company: "Growth Ventures",
      description: "Drive business growth through strategic partnerships and market expansion. Excellent career progression.",
      link: "https://example.com/bizdev-role"
    }
  ];

  return (
    <div className='main-content'>
        <div className="placements-page">
      {/* Decorative SVG Background */}
      <svg className="background-waves" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 50 C 50 30, 150 30, 200 50 L 200 0 L 0 0 Z" />
        <path d="M 0 100 C 50 80, 150 80, 200 100 L 200 0 L 0 0 Z" />
      </svg>

      <h1>Placements</h1>
      
      <div className="placement-grid">
        {placements.map((placement, index) => (
          <a
            key={index}
            href={placement.link}
            className="placement-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-content">
              <h2>{placement.title}</h2>
              <h3 className="company-name">{placement.company}</h3>
              <p>{placement.description}</p>
              <span className="view-position">View Position →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Placements;
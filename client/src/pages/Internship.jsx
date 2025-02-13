import React from 'react';
import '../styling/Internshippage.css';

const Internships = () => {
  const internships = [
    {
      title: "Software Development Intern",
      description: "Join our dynamic team to build cutting-edge web applications using modern technologies.",
      link: "https://example.com/swe-intern"
    },
    {
      title: "UX Design Intern",
      description: "Create beautiful and intuitive user experiences for our digital products.",
      link: "https://example.com/ux-intern"
    },
    {
      title: "Data Science Intern",
      description: "Work with big data and machine learning models to derive meaningful insights.",
      link: "https://example.com/data-intern"
    },
    {
      title: "Marketing Intern",
      description: "Drive growth through creative digital marketing campaigns and strategies.",
      link: "https://example.com/marketing-intern"
    },
    {
        title: "Software Development Intern",
        description: "Join our dynamic team to build cutting-edge web applications using modern technologies.",
        link: "https://example.com/swe-intern"
      },
      {
        title: "UX Design Intern",
        description: "Create beautiful and intuitive user experiences for our digital products.",
        link: "https://example.com/ux-intern"
      },
      {
        title: "Data Science Intern",
        description: "Work with big data and machine learning models to derive meaningful insights.",
        link: "https://example.com/data-intern"
      },
      {
        title: "Marketing Intern",
        description: "Drive growth through creative digital marketing campaigns and strategies.",
        link: "https://example.com/marketing-intern"
      }
  ];

  return (
    <div className='main-content'>
        <div className="internships-page">
      {/* Decorative SVG Background */}
      <svg className="background-circles" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="20" />
        <circle cx="170" cy="170" r="30" />
        <circle cx="170" cy="30" r="15" />
        <circle cx="30" cy="170" r="25" />
      </svg>

      <h1>Internships</h1>
      
      <div className="internship-grid">
        {internships.map((internship, index) => (
          <a
            key={index}
            href={internship.link}
            className="internship-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-content">
              <h2>{internship.title}</h2>
              <p>{internship.description}</p>
              <span className="learn-more">Learn More →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Internships;
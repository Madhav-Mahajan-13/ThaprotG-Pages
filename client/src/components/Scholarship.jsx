import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styling/Scholarship.css';

const ScholarshipCard = ({ title, description, link }) => {
  return (
    <div className="scholarship-card">
      <div className="card-icon">
        <div className="card-icon-inner" />
      </div>
      
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      
      <a href={link} className="learn-more-link">
        Learn More
        <ArrowRight className="arrow-icon" />
      </a>
    </div>
  );
};

const Scholarship = () => {
  const scholarships = [
    {
      title: 'AIF ',
      description: 'Comprehensive financial support for exceptional students pursuing their academic dreams and fostering educational excellence.',
      link: 'https://www.thapar.edu/academics/centerspages/alumni-in-focus88'
    },
    {
      title: 'ARC Student Team ',
      description: 'Supporting innovative research and collaborative projects that push the boundaries of academic achievement.',
      link: '/team'
    },
    {
      title: 'Podcasts ',
      description: 'Empowering creative voices through digital media, providing resources for storytelling and content creation.',
      link: '/podcast'
    },
    {
      title: 'ReUnion ',
      description: `Connecting generations through education, helping alumni children continue their family's legacy of learning.`,
      link: '#'
    }
  ];

  return (
    <div className="scholarship-container">
      <div className="scholarship-grid">
        {scholarships.map((scholarship, index) => (
          <ScholarshipCard
            key={index}
            title={scholarship.title}
            description={scholarship.description}
            link={scholarship.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Scholarship;
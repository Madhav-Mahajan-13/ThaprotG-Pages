import React from 'react';
import '../styling/Teampage.css';
import { Github, Linkedin, Instagram } from 'lucide-react';


  const TeamPage = () => {
  const ebMembers = [
    {
      name: "Mansi Bhargava",
      position: "Head Of Alumni Relations",
      image: "https://picsum.photos/id/1025/300/300",
      description: "Leading with vision and passion to drive innovation.",
      social: {
        instagram: "https://instagram.com/kushal",
        linkedin: "https://linkedin.com/in/kushal",
        github: "https://github.com/kushal"
      }
    },
    {
      name: "Kushal Preet Sallan",
      position: "President",
      image: "https://picsum.photos/id/1/300/300",
      description: "Leading with vision and passion to drive innovation.",
      social: {
        instagram: "https://instagram.com/kushal",
        linkedin: "https://linkedin.com/in/kushal",
        github: "https://github.com/kushal"
      }
    },
    {
      name: "Sara Agnihotri",
      position: "Vice President",
      image: "https://picsum.photos/id/1001/300/300",
      description: "Bringing teams together to achieve excellence.",
      social: {
        instagram: "https://instagram.com/sara",
        linkedin: "https://linkedin.com/in/sara",
        github: "https://github.com/sara"
      }
    },
    {
      name: "Parul",
      position: "Design Head",
      image: "https://picsum.photos/id/1018/300/300",
      description: "Crafting visual experiences that inspire and engage.",
      social: {
        instagram: "https://instagram.com/parul",
        linkedin: "https://linkedin.com/in/parul",
        github: "https://github.com/parul"
      }
    },
    {
      name: "Stavya Goel",
      position: "Head of External Affairs",
      image: "https://picsum.photos/id/1005/300/300",
      description: "Building partnerships and expanding our reach.",
      social: {
        instagram: "https://instagram.com/stavya",
        linkedin: "https://linkedin.com/in/stavya",
        github: "https://github.com/stavya"
      }
    },
    {
      name: "Sahil Saini",
      position: "Head of Internal Affairs",
      image: "https://picsum.photos/id/1006/300/300",
      description: "Fostering collaboration and team development.",
      social: {
        instagram: "https://instagram.com/sahil",
        linkedin: "https://linkedin.com/in/sahil",
        github: "https://github.com/sahil"
      }
    },
    {
      name: "Nipun Jain",
      position: "Head of Internal Affairs",
      image: "https://picsum.photos/id/117/300/300",
      description: "Strengthening internal processes and team dynamics.",
      social: {
        instagram: "https://instagram.com/nipun",
        linkedin: "https://linkedin.com/in/nipun",
        github: "https://github.com/nipun"
      }
    },
    {
      name: "Jatin Arora",
      position: "Cultural Head",
      image: "https://picsum.photos/id/1008/300/300",
      description: "Enriching our community through cultural initiatives.",
      social: {
        instagram: "https://instagram.com/madhav.culture",
        linkedin: "https://linkedin.com/in/madhav-culture",
        github: "https://github.com/madhav-culture"
      }
    },
    {
      name: "Madhav Mahajan",
      position: "Technical Head",
      image: "https://picsum.photos/id/1015/300/300",
      description: "Driving technical innovation and excellence.",
      social: {
        instagram: "https://instagram.com/madhav.tech",
        linkedin: "https://linkedin.com/in/madhav-tech",
        github: "https://github.com/madhav-tech"
      }
    }
  ];

  const departments = {
    tech: [
      "Aryan Sharma - Web Developer",
      "Ishita Gupta - App Developer",
      "Vansh Kapoor - Backend Developer",
      "Ananya Singh - UI/UX Developer",
      "Raghav Kumar - DevOps Engineer",
      "Nandini Jain - Frontend Developer"
    ],
    design: [
      "Khushi Verma - Graphic Designer",
      "Aarav Patel - UI Designer",
      "Diya Shah - Motion Designer",
      "Arnav Gupta - Brand Designer",
      "Aisha Khan - Visual Designer",
      "Rohan Mehta - Creative Designer"
    ],
    media: [
      "Yash Singh - Photography Lead",
      "Riya Sharma - Social Media Manager",
      "Aditya Kumar - Videographer",
      "Zara Ali - Content Creator",
      "Ved Patel - Media Coordinator",
      "Tanya Reddy - Digital Media Specialist"
    ],
    content: [
      "Mira Kapoor - Content Strategist",
      "Kabir Singh - Technical Writer",
      "Avni Shah - Creative Writer",
      "Neil Patel - Copy Editor",
      "Sana Khan - Blog Writer",
      "Arjun Nair - Content Developer"
    ]
  };

  return (
    <div className='main-content'>
         <div className="team-page">
      <section className="hero-section">
        <img 
          src="https://picsum.photos/id/1000/1200/600" // Team group photo
          alt="Team Group Photo" 
          className="team-group-photo"
        />
        <div className="hero-overlay">
          <h1>Our Amazing Team</h1>
          <p>Together we CONNECT CREATE CONTRIBUTE</p>
        </div>
      </section>

      <section className="eb-section">
        <h2>Executive Board</h2>
        <div className="eb-grid">
          {ebMembers.map((member, index) => (
            <div key={index} className="eb-card">
              <div className="eb-image-container">
                <img src={member.image} alt={member.name} className="eb-photo" />
              </div>
              <div className="eb-info">
                <h3>{member.name}</h3>
                <h4>{member.position}</h4>
                <p>{member.description}</p>
                <div className="social-links">
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={20} />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={20} />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="departments-section">
        <h2>Our Departments</h2>
        <div className="departments-grid">
          <div className="department">
            <h3>Tech Team</h3>
            <ul>
              {departments.tech.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <div className="department">
            <h3>Design Team</h3>
            <ul>
              {departments.design.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <div className="department">
            <h3>Media Team</h3>
            <ul>
              {departments.media.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <div className="department">
            <h3>Content Team</h3>
            <ul>
              {departments.content.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
    </div>
   
  );
};

export default TeamPage;
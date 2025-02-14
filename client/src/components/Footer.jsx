import React from "react"
import "../styling/Footer.css"


import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const developers = [
    {
      name: "Developer Name 1",
      role: "Full Stack Developer",
      image: "/api/placeholder/150/150", // Replace with actual image path
      social: {
        instagram: "https://instagram.com/dev1",
        github: "https://github.com/dev1",
        linkedin: "https://linkedin.com/in/dev1"
      }
    },
    {
      name: "Developer Name 2",
      role: "UI/UX Developer",
      image: "/api/placeholder/150/150", // Replace with actual image path
      social: {
        instagram: "https://instagram.com/dev2",
        github: "https://github.com/dev2",
        linkedin: "https://linkedin.com/in/dev2"
      }
    }
  ];

  return (
   <div className="main-content">
     <footer className="footer">
      {/* Developer Profiles Section */}
      <div className="developer-section">
        <h2 className="dev-heading">Meet Our Developers</h2>
        <div className="developer-cards">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <div className="dev-image-container">
                <img src={dev.image} alt={dev.name} className="dev-image" />
                <div className="social-overlay">
                  <a href={dev.social.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="social-icon instagram" />
                  </a>
                  <a href={dev.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="social-icon github" />
                  </a>
                  <a href={dev.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon linkedin" />
                  </a>
                </div>
              </div>
              <h3 className="dev-name">{dev.name}</h3>
              <p className="dev-role">{dev.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-section">
          <h3>About ThaProt-G</h3>
          <p>
            Empowering Thapar Institute students with a comprehensive platform
            for project collaboration, research opportunities, and professional
            growth. Connecting students, faculty, and alumni to foster innovation
            and excellence.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/projects">Alumni Projects</a></li>
            <li><a href="/alumni">Alumni Network</a></li>
            <li><a href="/resources">Resources</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Alumni Relations Cell</p>
          <p>Thapar Institute of Engineering & Technology</p>
          <p>Patiala, Punjab 147004</p>
          <p>Email: thaprotg@thapar.edu</p>
          <p>Phone: +91 XXX-XXX-XXXX</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 ThaProt-G. All rights reserved.</p>
      </div>
    </footer>
   </div>
  );
};

export default Footer;


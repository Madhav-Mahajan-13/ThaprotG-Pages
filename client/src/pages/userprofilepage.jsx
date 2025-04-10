

import React, { useState, useEffect, useContext } from 'react';
import { 
  Linkedin, 
  Mail, 
  GraduationCap, 
  Users, 
  FileText, 
  UserPlus, 
  Briefcase, 
  UsersRound,
  Clock
} from 'lucide-react';
import '../styling/userprofilepage.css';
import { useLocation } from "react-router-dom";
import { MyContext } from '../context/context';

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const { backendHost } = useContext(MyContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(backendHost + `/api/user/getUser/${username}`);
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username, backendHost]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading profile...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );

  const { user, projects } = userData;

  return (
    <div className="dashboard-wrapper">
      <main className="main-contenx">
        
        {/* Profile Section */}
        <div className="profile-info-card">
          <div className="profile-avatar">
            <img 
              src={user.profile_picture} 
              alt={`${user.first_name} ${user.last_name}`}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`;
              }}
            />
          </div>
          
          <h1 className="profile-name">{user.first_name} {user.last_name}</h1>
          <p className="profile-title">{user.degree}</p>
          
          {/* <button 
            className={`connect-btn ${isConnected ? 'connected' : ''}`}
            onClick={() => setIsConnected(!isConnected)}
          >
            <UserPlus size={18} />
            {isConnected ? 'Connected' : 'Connect'}
          </button> */}

          {/* Stats Section */}
          <div className="profile-stats">
            {/* <div className="stat-box">
              <UsersRound size={20} />
              <div>
                <span className="stat-number">127</span>
                <span className="stat-label">Connections</span>
              </div>
            </div> */}
            <div className="stat-box">
              <Briefcase size={20} />
              <div>
                <span className="stat-number">{projects.length}</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>

          {/* Bio & Contact */}
          {user.bio && <p className="user-bio">{user.bio}</p>}

          <div className="contact-info">
            <span><Mail size={16} /> {user.email}</span>
            <span><GraduationCap size={16} /> Class of {user.graduation_year}</span>
            {user.linkedin_url && (
              <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <section className="projects-section">
          <h2>Projects & Contributions</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.project_id} className="project-card">
                {project.image_path && (
                  <div className="project-image-container">
                    <img 
                      src={backendHost + "/" + project.image_path} 
                      alt={project.title}
                    />
                  </div>
                )}
                
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-meta">
                    <span>
                      <Clock size={14} />
                      Due: {new Date(project.open_until).toLocaleDateString()}
                    </span>
                    <span>
                      <Users size={14} />
                      {project.openings} openings
                    </span>
                  </div>

                  {Array.isArray(project.technology) && project.technology.length > 0 && (
                    <div className="tech-stack">
                      {project.technology.map((tech, index) => (
                        <span key={index} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  )}

                  {project.pdf_path && (
                    <a
                      href={backendHost + "/" + project.pdf_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-pdf-btn"
                    >
                      <FileText size={14} />
                      View Details
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;

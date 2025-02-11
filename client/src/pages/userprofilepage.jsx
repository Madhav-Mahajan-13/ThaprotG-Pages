import React, { useState, useEffect } from 'react';
import { Calendar, Linkedin, Mail, GraduationCap, Users, FileText, UserPlus, Briefcase, UsersRound } from 'lucide-react';
import '../styling/userprofilepage.css';

const UserDashboard = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/getUser/${username}`);
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message);
        }
        
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
    // Add your connect logic here
  };

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  const { user, projects } = userData;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <div className="profile-avatar-large">
            <img 
              src={user.profile_picture} 
              alt={`${user.first_name} ${user.last_name}`}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`;
              }}
            />
          </div>
          <h2 className="sidebar-name">{user.first_name} {user.last_name}</h2>
          <p className="sidebar-degree">{user.degree}</p>
          
          <button 
            className={`connect-button ${isConnected ? 'connected' : ''}`}
            onClick={handleConnect}
          >
            <UserPlus size={16} />
            {isConnected ? 'Connected' : 'Connect'}
          </button>

          <div className="stats-container">
            <div className="stat-item">
              <UsersRound size={20} />
              <div className="stat-info">
                <span className="stat-value">127</span>
                <span className="stat-label">Connections</span>
              </div>
            </div>
            <div className="stat-item">
              <Briefcase size={20} />
              <div className="stat-info">
                <span className="stat-value">{projects.length}</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Profile Section */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-details">
              <h1 className="profile-name">
                {user.first_name} {user.last_name}
                {user.suspended && (
                  <span className="suspended-badge">Suspended</span>
                )}
              </h1>

              <div className="profile-metadata">
                <div className="metadata-item">
                  <Mail size={16} />
                  {user.email}
                </div>
                <div className="metadata-item">
                  <GraduationCap size={16} />
                  {user.graduation_year}
                </div>
                {user.linkedin_url && (
                  <a 
                    href={user.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="metadata-item link"
                  >
                    <Linkedin size={16} />
                    LinkedIn Profile
                  </a>
                )}
              </div>

              {user.bio && (
                <p className="profile-bio">{user.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <h2 className="section-title">Projects ({projects.length})</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.project_id} className="project-card">
              {project.image_path && (
                <img 
                  src={"http://localhost:5000/"+project.image_path} 
                  alt={project.title}
                  className="project-image"
                />
              )}
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-status">{project.status}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-metadata">
                  <div className="metadata-item">
                    <Calendar size={16} />
                    Open until: {new Date(project.open_until).toLocaleDateString()}
                  </div>
                  
                  <div className="metadata-item">
                    <Users size={16} />
                    Openings: {project.openings}
                  </div>

                  {Array.isArray(project.technology) && project.technology.length > 0 && (
                    <div className="tech-tags">
                      {project.technology.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.pdf_path && (
                    <a
                      href={"http://localhost:5000/"+project.pdf_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdf-link"
                    >
                      <FileText size={16} />
                      View Project PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
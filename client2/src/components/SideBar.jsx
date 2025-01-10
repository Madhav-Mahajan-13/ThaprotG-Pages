import React, { useState } from "react";
import "../styling/Sidebar.css";

const Sidebar = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className={`app-container ${showChat ? "chat-active" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-container">
          {/* Logo */}
          <a href="/" className="sidebar-logo">
            <img
              src="/assets/images/logo-text.svg"
              alt="logo"
              className="logo-image"
            />
            <div className="project-name">ThaProt-G</div>
          </a>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul className="sidebar-links">
              <li>
                <a href="/" className="sidebar-button">
                  Home
                </a>
              </li>
              <li>
                <a href="/alumproject" className="sidebar-button">
                  Projects
                </a>
              </li>
              <li>
                <a href="/studentproject" className="sidebar-button">
                  Projects by Students
                </a>
              </li>
              <li>
                <a href="/campusgallery" className="sidebar-button">
                  Gallery
                </a>
                <a href="/campusgallery" className="sidebar-button">
                 Events Showcase
                </a>
              </li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="user-section">
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="username">Username</span>
            </div>
            <button className="chat-button" onClick={toggleChat}>
              Chat 💬
            </button>
            <button className="chat-button" >
             Quick Post
            </button>
            <button className="chat-button" onClick={toggleChat}>
              Your Projects
            </button>
            <button className="chat-button" onClick={toggleChat}>
              Your Profile
            </button>

          </div>

          {/* Logout Button */}
          <div className="logout-section">
            <button
              className="logout-button"
              onClick={() => alert("Logged Out")}
            >
              Logout 
            </button>
          </div>
        </div>
      </aside>

      {/* Chat Window */}
      <div className={`chat-window ${showChat ? "open" : ""}`}>
        <div className="chat-header">
          <span>Chat</span>
          <button onClick={toggleChat} className="chat-close-button">
            ✖
          </button>
        </div>
        <div className="chat-body">
          <p>Welcome to the chat!</p>
          {/* Add your chat content here */}
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;

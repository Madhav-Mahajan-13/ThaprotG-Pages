import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaUserGraduate, FaImages, FaCalendarAlt, FaComments, FaPlusCircle, FaFolderOpen, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import "../styling/MobileNav.css";

const MobileNav = ({ userName, onLogout, toggleChat, toggleQuickPost, toggleYourProject, toggleYourProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-container">
        <Link to="/" className="mobile-nav-logo">
          <img src="/assets/images/logo-text.svg" alt="logo" className="mobile-logo" />
          <span className="mobile-project-name">ThaProt-G</span>
        </Link>
        <button className="mobile-nav-toggle" onClick={toggleMenu}>
          <span className="sr-only">Menu</span>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`mobile-nav-menu ${isOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" onClick={toggleMenu}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/alumproject" onClick={toggleMenu}>
              <FaProjectDiagram /> Projects
            </Link>
          </li>
          <li>
            <Link to="/studentproject" onClick={toggleMenu}>
              <FaUserGraduate /> Student Projects
            </Link>
          </li>
          <li>
            <Link to="/campusgallery" onClick={toggleMenu}>
              <FaImages /> Gallery
            </Link>
          </li>
          <li>
            <Link to="/campusgallery" onClick={toggleMenu}>
              <FaCalendarAlt /> Events Showcase
            </Link>
          </li>
        </ul>
        <div className="mobile-user-section">
          <div className="mobile-user-info">
            <FaUserCircle className="mobile-user-icon" />
            <span className="mobile-username">{userName}</span>
          </div>
          <button className="mobile-action-button" onClick={() => handleNavClick(toggleChat)}>
            <FaComments /> Chat
          </button>
          <button className="mobile-action-button" onClick={() => handleNavClick(toggleQuickPost)}>
            <FaPlusCircle /> Quick Post
          </button>
          <button className="mobile-action-button" onClick={() => handleNavClick(toggleYourProject)}>
            <FaFolderOpen /> Your Projects
          </button>
          <button className="mobile-action-button" onClick={() => handleNavClick(toggleYourProfile)}>
            <FaUserCircle /> Your Profile
          </button>
          <button className="mobile-logout-button" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;

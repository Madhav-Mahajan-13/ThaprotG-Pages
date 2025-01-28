import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../styling/MobileNav.css"

const MobileNav = ({ userName, onLogout, toggleChat, toggleQuickPost, toggleYourProject, toggleYourProfile }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="mobile-nav">
      <button className="mobile-nav-toggle" onClick={toggleMenu}>
        <span className="sr-only">Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>
      <div className={`mobile-nav-content ${isOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <img src="/assets/images/logo-text.svg" alt="logo" className="mobile-logo" />
          <div className="mobile-project-name">ThaProt-G</div>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/alumproject" onClick={toggleMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/studentproject" onClick={toggleMenu}>
              Projects by Students
            </Link>
          </li>
          <li>
            <Link to="/campusgallery" onClick={toggleMenu}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/campusgallery" onClick={toggleMenu}>
              Events Showcase
            </Link>
          </li>
        </ul>
        <div className="mobile-user-section">
          <div className="mobile-user-info">
            <span className="mobile-user-icon">👤</span>
            <span className="mobile-username">{userName}</span>
          </div>
          <button
            className="mobile-action-button"
            onClick={() => {
              toggleChat()
              toggleMenu()
            }}
          >
            Chat 💬
          </button>
          <button
            className="mobile-action-button"
            onClick={() => {
              toggleQuickPost()
              toggleMenu()
            }}
          >
            Quick Post
          </button>
          <button
            className="mobile-action-button"
            onClick={() => {
              toggleYourProject()
              toggleMenu()
            }}
          >
            Your Projects
          </button>
          <button
            className="mobile-action-button"
            onClick={() => {
              toggleYourProfile()
              toggleMenu()
            }}
          >
            Your Profile
          </button>
          <button className="mobile-logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav


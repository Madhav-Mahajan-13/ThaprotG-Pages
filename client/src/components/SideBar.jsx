import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../styling/SideBar3.css";
import { Dashboard } from "./Dashboard";
import axios from "axios";
import { userid } from "../context/userid";


const SectionWindow = ({ title, show, toggle, children }) => (
  <div className={`side-window ${show ? "open" : ""}`}>
    <div className="side-header">
      <span>{title}</span>
      <button onClick={toggle} className="side-close-button">
        ✖
      </button>
    </div>
    <div className="side-body">{children}</div>
  </div>
);

const QuickPostForm = () => {
  const uid = userid; // Replace with actual user ID logic
  const initialFormState = {
    title: "",
    description: "",
    openings: "",
    technology: "",
    openUntil: "",
    pdf: null,
    image: null,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description || !formData.openings || !formData.technology || !formData.openUntil) {
      setError("Please fill out all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("id", uid);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("openings", formData.openings);
    formDataToSend.append("technology", formData.technology);
    formDataToSend.append("openUntil", formData.openUntil);
    if (formData.pdf) formDataToSend.append("pdf", formData.pdf);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/projects/postProject", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);
      setFormData({
        title: "",
        description: "",
        openings: "",
        technology: "",
        openUntil: "",
        pdf: null,
        image: null,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quick-post-form">
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="openings">Openings</label>
        <input type="number" id="openings" name="openings" value={formData.openings} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="technology">Technology</label>
        <input type="text" id="technology" name="technology" value={formData.technology} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="openUntil">Open Until</label>
        <input type="date" id="openUntil" name="openUntil" value={formData.openUntil} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="pdf">PDF</label>
        <input type="file" id="pdf" name="pdf" accept="application/pdf" onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};


const Sidebar = () => {
  const [showChat, setShowChat] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showQuickPost, setQuickPost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const toggleChat = () => setShowChat(!showChat);
  const toggleYourProject = () => setShowProject(!showProject);
  const toggleQuickPost = () => setQuickPost(!showQuickPost);
  const toggleYourProfile =()=> setShowProfile(!showProfile)
  return (
    <div className={`app-container ${showChat ? "chat-active" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-container">
          {/* Logo */}
          <Link to="/" className="sidebar-logo">
            <img
              src="/assets/images/logo-text.svg"
              alt="logo"
              className="logo-image"
            />
            <div className="project-name">ThaProt-G</div>
          </Link>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul className="sidebar-links">
              <li>
                <Link to="/" className="sidebar-button">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/alumproject" className="sidebar-button">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/studentproject" className="sidebar-button">
                  Projects by Students
                </Link>
              </li>
              <li>
                <Link to="/campusgallery" className="sidebar-button">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/campusgallery" className="sidebar-button">
                  Events Showcase
                </Link>
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
            <button className="chat-button" onClick={toggleQuickPost}>
              Quick Post
            </button>
            <button className="chat-button" onClick={toggleYourProject}>
              Your Projects
            </button>
            {/* <button className="chat-button"><a href="/profile">Your Profile</a></button> */}
            <button className="chat-button" onClick={toggleYourProfile}>
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

      {/* Side Windows */}
      <SectionWindow title="Chat" show={showChat} toggle={toggleChat}>
        <p>Welcome to the chat!</p>
        {/* Add your chat content here */}
      </SectionWindow>

      <SectionWindow
        title="Your Projects"
        show={showProject}
        toggle={toggleYourProject}
      >
        <p>Render the project element</p>
        {/* Add your project content here */}
      </SectionWindow>

      <SectionWindow
        title="Quick Post"
        show={showQuickPost}
        toggle={toggleQuickPost}
      >
        <QuickPostForm />
      </SectionWindow>
      <SectionWindow 
  title="dashboard"
  show={showProfile}
  toggle={toggleYourProfile}
>
  {/* Pass userId as a prop to Dashboard */}
  <Dashboard userId="0237552f-1a66-4a7d-968e-74f5e5aee00d" />
</SectionWindow>

    </div>
  );
};

export default Sidebar;

import { Link, useNavigate } from "react-router-dom"
import React, { useContext, useRef, useEffect, useState } from "react"
import "../styling/SideBar3.css"
import { Dashboard } from "./Dashboard"
import axios from "axios"
import { MyContext } from "../context/context"
import UserProjects from "./UserProjectsCard.jsx"
import MobileNav from "./MobileNav.jsx"
import logo from "../assets/LOGO.png";
import {
  FaHome,
  FaProjectDiagram,
  FaUserGraduate,
  FaImages,
  FaCalendarAlt,
  FaComments,
  FaPlusCircle,
  FaFolderOpen,
  FaUserCircle,
  FaSignOutAlt,
  FaIdCard, FaHandHoldingHeart,
  FaCheckCircle
} from "react-icons/fa"


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
)

// Toast component
const Toast = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`toast-notification ${visible ? 'toast-visible' : ''}`}>
      <div className="toast-content">
        <FaCheckCircle className="toast-icon" />
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

const QuickPostForm = () => {
  const { userId } = useContext(MyContext)
  const uid = userId
  const [toast, setToast] = useState({ visible: false, message: '' });

  const departments = [
    "CSED",
    "MED",
    "ECED",
    "CIVIL",
    "BIO-TECH",
    "MBA",
    "LIB-ARTS",
    "CHEMICAL"
  ]

  const initialFormState = {
    title: "",
    description: "",
    openings: "",
    technology: "",
    openUntil: "",
    department: "",
    pdf: null,
    image: null,
  }

  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState(null)

  const pdfInputRef = useRef(null)
  const imageInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "title" && value.length > 100) return
    if (name === "description" && value.length > 1000) return
    if (name === "technology" && value.length > 200) return
    if (name === "openings" && (value < 1 || value > 100)) return

    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData({ ...formData, [name]: files[0] })
  }

  const showToast = (message) => {
    setToast({ visible: true, message });
  };

  const hideToast = () => {
    setToast({ visible: false, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.title || !formData.description || !formData.openings || 
        !formData.technology || !formData.openUntil || !formData.department) {
      setError("Please fill out all required fields.")
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append("id", uid)
    formDataToSend.append("title", formData.title)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("openings", formData.openings)
    formDataToSend.append("technology", formData.technology)
    formDataToSend.append("openUntil", formData.openUntil)
    formDataToSend.append("department", formData.department)
    if (formData.pdf) formDataToSend.append("pdf", formData.pdf)
    if (formData.image) formDataToSend.append("image", formData.image)

    try {
      const response = await axios.post("http://localhost:5000/api/projects/postProject", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      
      // Show toast instead of alert
      showToast("Project posted successfully!");
      console.log("Response:", response.data)

      setFormData(initialFormState)

      if (pdfInputRef.current) pdfInputRef.current.value = ""
      if (imageInputRef.current) imageInputRef.current.value = ""

    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit the form.")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="quick-post-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required maxLength="100" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required maxLength="1000"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department" name="department" value={formData.department} onChange={handleInputChange} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="openings">Openings</label>
          <input type="number" id="openings" name="openings" value={formData.openings} onChange={handleInputChange} required min="1" max="100" />
        </div>

        <div className="form-group">
          <label htmlFor="technology">Technology</label>
          <input type="text" id="technology" name="technology" value={formData.technology} onChange={handleInputChange} required maxLength="200" />
        </div>

        <div className="form-group">
          <label htmlFor="openUntil">Open Until</label>
          <input type="date" id="openUntil" name="openUntil" value={formData.openUntil} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="pdf">PDF</label>
          <input type="file" id="pdf" name="pdf" accept="application/pdf" onChange={handleFileChange} ref={pdfInputRef} required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} ref={imageInputRef} required />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
    </>
  )
}

const Sidebar = () => {
  const { userId, backendHost, isAlum } = useContext(MyContext)
  const [userName, setUserName] = useState("")
  const [openWindow, setOpenWindow] = useState(null)
  const navigate = useNavigate();

  const toggleWindow = (windowName) => {
    setOpenWindow(openWindow === windowName ? null : windowName)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/dashboard/${userId}`)
        setUserName(`${response.data.first_name} ${response.data.last_name}`)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  const handleLogout = async () => {
    const res = await fetch(backendHost + '/api/auth/logout',{
      method:'POST',
      credentials:'include'
    })
    navigate("/login");
  }

  return (
    <div className={`app-container ${openWindow === "chat" ? "chat-active" : ""}`}>
      <MobileNav
        userName={userName}
        onLogout={handleLogout}
        toggleChat={() => toggleWindow("chat")}
        toggleQuickPost={() => toggleWindow("quickPost")}
        toggleYourProject={() => toggleWindow("yourProject")}
        toggleYourProfile={() => toggleWindow("yourProfile")}
      />
      <aside className="sidebar">
        <div className="sidebar-container">
          <Link to="/" className="sidebar-logo">
            <img src={logo} alt="logo" className="logo-image" />
            <div className="project-name">ThaProt-G</div>
          </Link>

          <nav className="sidebar-nav">
            <ul className="sidebar-links">
              <li>
                <Link to="/" className="sidebar-button">
                  <FaHome className="sidebar-icon" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/alumproject" className="sidebar-button">
                  <FaProjectDiagram className="sidebar-icon" />
                  <span>Alumni Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/studentproject" className="sidebar-button">
                  <FaUserGraduate className="sidebar-icon" />
                  <span>Student Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/campusgallery" className="sidebar-button">
                  <FaImages className="sidebar-icon" />
                  <span>Insights</span>
                </Link>
              </li>
              { isAlum &&
              <>
              <li>
                <Link to="/alumcard" className="sidebar-button">
                  <FaIdCard className="sidebar-icon" />
                  <span>Alum Card</span>
                </Link>
              </li>
              <li>
                <Link to="/giveback" className="sidebar-button">
                  <FaHandHoldingHeart className="sidebar-icon" />
                  <span>Giving Back</span>
                </Link>
              </li>
              </>
              }
            </ul>
          </nav>

          <div className="user-section">
            <div className="user-info">
              <FaUserCircle className="user-icon" />
              <span className="username">{userName}</span>
            </div>
            {/* <button className="action-button" onClick={() => toggleWindow("chat")}>
              <FaComments className="button-icon" />
              <span>Chat</span>
            </button> */}
            <button className="action-button" onClick={() => toggleWindow("quickPost")}>
              <FaPlusCircle className="button-icon" />
              <span>Quick Post</span>
            </button>
            <button className="action-button" onClick={() => toggleWindow("yourProject")}>
              <FaFolderOpen className="button-icon" />
              <span>Your Projects</span>
            </button>
            <button className="action-button" onClick={() => toggleWindow("yourProfile")}>
              <FaUserCircle className="button-icon" />
              <span>Your Profile</span>
            </button>
          </div>

          <div className="logout-section">
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt className="button-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <SectionWindow title="Chat" show={openWindow === "chat"} toggle={() => toggleWindow("chat")}>
        <p>Welcome to the chat!</p>
      </SectionWindow>

      <SectionWindow
        title="Your Projects"
        show={openWindow === "yourProject"}
        toggle={() => toggleWindow("yourProject")}
      >
        <UserProjects />
      </SectionWindow>

      <SectionWindow title="Quick Post" show={openWindow === "quickPost"} toggle={() => toggleWindow("quickPost")}>
        <QuickPostForm />
      </SectionWindow>

      <SectionWindow title="Dashboard" show={openWindow === "yourProfile"} toggle={() => toggleWindow("yourProfile")}>
        <Dashboard />
      </SectionWindow>
    </div>
  )
}

export default Sidebar
// import React, { useState } from "react";
// import "../styling/Sidebar.css";

// const SectionWindow = ({ title, show, toggle, children }) => (
//   <div className={`chat-window ${show ? "open" : ""}`}>
//     <div className="chat-header">
//       <span>{title}</span>
//       <button onClick={toggle} className="chat-close-button">
//         ✖
//       </button>
//     </div>
//     <div className="chat-body">{children}</div>
//   </div>
// );

// const QuickPostForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     openings: "",
//     technology: "",
//     openUntil: "",
//     pdf: null,
//     image: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // Add form submission logic here
//   };

//   return (
//     <form onSubmit={handleSubmit} className="quick-post-form">
//       <div className="form-group">
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           required
//         ></textarea>
//       </div>
//       <div className="form-group">
//         <label htmlFor="openings">Openings</label>
//         <input
//           type="number"
//           id="openings"
//           name="openings"
//           value={formData.openings}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="technology">Technology</label>
//         <input
//           type="text"
//           id="technology"
//           name="technology"
//           value={formData.technology}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="openUntil">Open Until</label>
//         <input
//           type="date"
//           id="openUntil"
//           name="openUntil"
//           value={formData.openUntil}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="pdf">PDF</label>
//         <input
//           type="file"
//           id="pdf"
//           name="pdf"
//           accept="application/pdf"
//           onChange={handleFileChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </div>
//       <div className="form-actions">
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };

// const Sidebar = () => {
//   const [showChat, setShowChat] = useState(false);
//   const [showProject, setShowProject] = useState(false);
//   const [showQuickPost, setQuickPost] = useState(false);

//   const toggleChat = () => setShowChat(!showChat);
//   const toggleYourProject = () => setShowProject(!showProject);
//   const toggleQuickPost = () => setQuickPost(!showQuickPost);

//   return (
//     <div className={`app-container ${showChat ? "chat-active" : ""}`}>
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="sidebar-container">
//           {/* Logo */}
//           <a href="/" className="sidebar-logo">
//             <img
//               src="/assets/images/logo-text.svg"
//               alt="logo"
//               className="logo-image"
//             />
//             <div className="project-name">ThaProt-G</div>
//           </a>

//           {/* Navigation */}
//           <nav className="sidebar-nav">
//             <ul className="sidebar-links">
//               <li>
//                 <a href="/" className="sidebar-button">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/alumproject" className="sidebar-button">
//                   Projects
//                 </a>
//               </li>
//               <li>
//                 <a href="/studentproject" className="sidebar-button">
//                   Projects by Students
//                 </a>
//               </li>
//               <li>
//                 <a href="/campusgallery" className="sidebar-button">
//                   Gallery
//                 </a>
//                 <a href="/campusgallery" className="sidebar-button">
//                   Events Showcase
//                 </a>
//               </li>
//             </ul>
//           </nav>

//           {/* User Section */}
//           <div className="user-section">
//             <div className="user-info">
//               <span className="user-icon">👤</span>
//               <span className="username">Username</span>
//             </div>
//             <button className="chat-button" onClick={toggleChat}>
//               Chat 💬
//             </button>
//             <button className="chat-button" onClick={toggleQuickPost}>
//               Quick Post
//             </button>
//             <button className="chat-button" onClick={toggleYourProject}>
//               Your Projects
//             </button>
//             <button className="chat-button">
//               Your Profile
//             </button>
//           </div>

//           {/* Logout Button */}
//           <div className="logout-section">
//             <button
//               className="logout-button"
//               onClick={() => alert("Logged Out")}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Chat Window */}
//       <SectionWindow title="Chat" show={showChat} toggle={toggleChat}>
//         <p>Welcome to the chat!</p>
//         {/* Add your chat content here */}
//       </SectionWindow>

//       {/* Your Project Window */}
//       <SectionWindow title="Your Projects" show={showProject} toggle={toggleYourProject}>
//         <p>Render the project element</p>
//         {/* Add your project content here */}
//       </SectionWindow>

//       {/* Quick Post Window */}
//       <SectionWindow title="Quick Post" show={showQuickPost} toggle={toggleQuickPost}>
//         <QuickPostForm />
//       </SectionWindow>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import "../styling/Sidebar.css";

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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    openings: "",
    technology: "",
    openUntil: "",
    pdf: null,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="quick-post-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="openings">Openings</label>
        <input
          type="number"
          id="openings"
          name="openings"
          value={formData.openings}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="technology">Technology</label>
        <input
          type="text"
          id="technology"
          name="technology"
          value={formData.technology}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="openUntil">Open Until</label>
        <input
          type="date"
          id="openUntil"
          name="openUntil"
          value={formData.openUntil}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pdf">PDF</label>
        <input
          type="file"
          id="pdf"
          name="pdf"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
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

  const toggleChat = () => setShowChat(!showChat);
  const toggleYourProject = () => setShowProject(!showProject);
  const toggleQuickPost = () => setQuickPost(!showQuickPost);

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
            <button className="chat-button" onClick={toggleQuickPost}>
              Quick Post
            </button>
            <button className="chat-button" onClick={toggleYourProject}>
              Your Projects
            </button>
            <button className="chat-button">
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

      <SectionWindow title="Your Projects" show={showProject} toggle={toggleYourProject}>
        <p>Render the project element</p>
        {/* Add your project content here */}
      </SectionWindow>

      <SectionWindow title="Quick Post" show={showQuickPost} toggle={toggleQuickPost}>
        <QuickPostForm />
      </SectionWindow>
    </div>
  );
};

export default Sidebar;

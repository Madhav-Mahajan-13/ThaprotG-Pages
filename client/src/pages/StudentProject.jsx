import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios"
import "../styling/alum2.css"

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="image-section">
      <img src={"http://localhost:5000/"+project.image_path || "/placeholder-image.jpg"} alt={project.title} className="project-image" />
    </div>
    <div className="details-section">
      <h3 className="project-name">{project.title}</h3>
      <p className="posted-by">
        <strong>By:</strong> 
        <Link to='/userInfo' state={{username : project.username}}>
        {project.first_name} {project.last_name}
        </Link>
      </p>
      <p className="description">{project.description}</p>
      <div className="info-grid">
        <p>
          <strong>Tech:</strong> {Array.isArray(project.technology) ? project.technology.join(", ") : project.technology}
        </p>
        <p>
          <strong>Openings:</strong> {project.openings}
        </p>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
        <p>
          <strong>Open Until:</strong> {new Date(project.open_until).toLocaleDateString()}
        </p>
        <p>
          <strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}
        </p>
      </div>
      {project.pdf_path && (
        <a
          href={`http://localhost:5000/${project.pdf_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pdf-link"
        >
          View Details
        </a>
      )}
    </div>
  </div>
);


const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    description: "",
    technology: "",
    openings: "",
  })

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchParams)
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        name="title"
        placeholder="title"
        value={searchParams.title}
        onChange={handleInputChange}
        className="search-input"
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={searchParams.description}
        onChange={handleInputChange}
        className="search-input"
      />
      <input
        type="text"
        name="technology"
        placeholder="technology"
        value={searchParams.technology}
        onChange={handleInputChange}
        className="search-input"
      />
      <input
        type="number"
        name="openings"
        placeholder="openings"
        value={searchParams.openings}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  )
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className="pagination-button"
    >
      Previous
    </button>
    <span className="page-info">
      {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="pagination-button"
    >
      Next
    </button>
  </div>
)

const StudentProject = () => {
  const [projects, setProjects] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useState({
    title: "",
    description: "",
    technology: "",
    openings: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [currentPage, searchParams]) //Corrected dependency array

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const endpoint = Object.values(searchParams).some((param) => param !== "")
        ? "/api/studentprojects/search"
        : "/api/studentprojects/allproject"
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        ...searchParams,
        page: currentPage,
        limit: 10,
      })
      setProjects(response.data.data.projects)
      setTotalPages(response.data.data.pagination.totalPages)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams)
    setCurrentPage(1)
  }

  return (
    <div className="projects-page">
      <h1 className="gallery-title">Student Projects</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="projects-list">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => <ProjectCard key={project.project_id} project={project} />)
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default StudentProject


import React, { useState, useEffect } from "react"
import "../styling/alum2.css"
import { fetchProjects } from "../services/fakeApi_Project.js"
import SearchBar from "../components/SearchBar.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import Pagination from "../components/Pagination.jsx"

const AlumProject = () => {
  const [projects, setProjects] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      try {
        const data = await fetchProjects(currentPage, searchQuery, selectedCategory)
        setProjects(data.projects)
        setTotalPages(data.totalPages)
        setCategories(data.categories)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [currentPage, searchQuery, selectedCategory])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div className="projects-page">
      <h1 className="gallery-title">Stundent Projects</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="projects-list">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default AlumProject


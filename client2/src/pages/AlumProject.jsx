import React, { useState, useEffect } from "react";
import "../styling/AlumProject/AlumProject.css"
import { fetchProjects } from "../services/fakeApi_Project.js"; // API request
import SearchBar from "../components/SearchBar.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Pagination from "../components/Pagination.jsx";

const AlumProject = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(currentPage, searchQuery, selectedCategory);
        setProjects(data.projects);
        setTotalPages(data.totalPages);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    loadProjects();
  }, [currentPage, searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="projects-page">
      <SearchBar onSearch={handleSearch} />
      <div className="projects-list">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AlumProject;



import React from "react"
import ProjectCard from "./ProjectCard"
import "../../styling/admin/ProjectSection.css"

const ProjectSection = ({ projects }) => {
  return (
    <div className="project-section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default ProjectSection


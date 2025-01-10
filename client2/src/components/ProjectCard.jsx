import React from "react";
import "../styling/AlumProject/ProjectCard.css"
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="image-section">
        <img src={project.image} alt={project.name} className="project-image" />
      </div>
      <div className="details-section">
        <h3 className="project-name">{project.name}</h3>
        <p className="posted-by">Posted by: {project.postedBy}</p>
        <p className="date-posted">Date Posted: {project.datePosted}</p>
        <p className="description">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

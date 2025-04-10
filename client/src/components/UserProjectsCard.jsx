import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../context/context';
import "../styling/userprojectcard.css";

// Helper function to determine the status color
const getStatusColor = (status) => {
    switch (status) {
        case 'approved':
            return 'green';
        case 'pending':
            return 'yellow';
        case 'denied':
            return 'red';
        default:
            return 'gray';
    }
};

const UserProjects = () => {
    const { userId , backendHost } = useContext(MyContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            console.log('User ID is not available');
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            try {
                const response = await fetch(backendHost +  '/api/projects/getUserProject', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId })
                });
                const data = await response.json();
                
                if (data.success) {
                    setProjects(data.data);
                } else {
                    console.error('Failed to fetch projects:', data.message);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId]);

    const handleOpenPdf = (pdfPath) => {
        if (pdfPath) {
            window.open(backendHost + `/${pdfPath}`, '_blank');
        } else {
            alert('PDF not available.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="projects-section">
            <h1>Projects</h1>
            <div className="projects-container">
                {projects.map((project) => (
                    <div
                        key={project.project_id}
                        className="project-card"
                        onClick={() => handleOpenPdf(project.pdf_path)}
                    >
                        <img
                            src={backendHost+project.image_path} 
                            alt={project.title}
                            className="project-image"
                        />
                        
                        <div
                            className="status-bar"
                            style={{ backgroundColor: getStatusColor(project.status) }}
                        >
                            {project.status}
                        </div>

                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <p><strong>Openings:</strong> {project.openings}</p>
                        <p><strong>Technology:</strong> {project.technology}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProjects;

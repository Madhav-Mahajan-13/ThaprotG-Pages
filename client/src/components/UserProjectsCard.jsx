import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../context/context';
import "../styling/userprojectcard.css"
// import { useMyContext } from './MyContext'; // Adjust the import path

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

    const {userId}=useContext(MyContext)
    
    
    const [projects, setProjects] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null); // For modal PDF display
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            // Handle case when userId is not available
            console.log('User ID is not available');
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/projects/getUserProject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }) // Use userId from context
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
    }, [userId]); // Depend on userId to refetch when it changes

    const handleOpenPdf = (pdfPath) => {
        setSelectedPdf(pdfPath);
    };

    const closePdfModal = () => {
        setSelectedPdf(null);
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
                        onClick={() => handleOpenPdf(project.pdf_path)} // Make the entire card clickable
                    >
                        <img
                            // src={project.image_path}
                            src="https://picsum.photos/id/26/200/300"
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

            {selectedPdf && (
                <div className="pdf-modal">
                    <div className="modal-content">
                        <button onClick={closePdfModal}>Close</button>
                        <iframe
                            src={`/${selectedPdf}`}
                            width="100%"
                            height="600px"
                            title="Project PDF"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProjects;

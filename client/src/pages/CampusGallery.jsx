

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styling/Gallery2.css"

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchImages(currentPage);
    }, [currentPage]);

    const fetchImages = async (page) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/gallery/');

            if (response.data.success) {
                setImages(response.data.data.projects);
                setPagination(response.data.data.pagination);
            }
        } catch (err) {
            setError('Failed to fetch images. Please try again later.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="gallery-container">
            <h1 className="gallery-title">CAMPUS INSIGHT</h1>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <>
                    <div className="gallery-grid">
                        {images.map((image) => (
                            <div key={image.id} className="gallery-item">
                                <div className="image-wrapper">
                                    <img src={image.imgsrc} alt={image.description} />
                                </div>
                                <div className="image-info">
                                    <div className="tag">{image.tag}</div>
                                    <p className="description">{image.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                className="pagination-button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!pagination.hasPreviousPage}
                            >
                                Previous
                            </button>
                            
                            <div className="page-numbers">
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                                    .filter(page => (
                                        page === 1 ||
                                        page === pagination.totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ))
                                    .map((page, index, array) => (
                                        <React.Fragment key={page}>
                                            {index > 0 && array[index - 1] !== page - 1 && (
                                                <span className="ellipsis">...</span>
                                            )}
                                            <button
                                                className={`page-number ${currentPage === page ? 'active' : ''}`}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </button>
                                        </React.Fragment>
                                    ))}
                            </div>

                            <button 
                                className="pagination-button"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!pagination.hasNextPage}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Gallery;
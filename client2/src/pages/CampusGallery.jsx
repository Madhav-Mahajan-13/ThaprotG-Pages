import React, { useEffect, useState } from "react";
import { fetchImages } from "../services/fakeApi.js"; // Import the fake API

import "../styling/Gallery2.css"; // Import styling for the gallery

const CampusGallery = () => {
  const [images, setImages] = useState([]); // State to store image data
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  const limit = 20; // 20 images per page

  useEffect(() => {
    // Fetch images when the component mounts or currentPage changes
    const getImages = async () => {
      const response = await fetchImages(currentPage, limit);
      setImages(response.images);
      setTotalPages(Math.ceil(response.total / limit));
    };

    getImages();
  }, [currentPage]);

  // Pagination Handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>

      {/* Image Grid */}
      <div className="image-grid">
        {images.map((item) => (
          <div key={item.id} className="image-card">
            <img src={item.imageUrl} alt={`Image ${item.id}`} className="image" />
            <p className="image-text">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampusGallery;

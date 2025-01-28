import React, { useEffect, useState } from "react"
import { fetchImages } from "../services/fakeApi.js"
import "../styling/Gallery.css"

const CampusGallery = () => {
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const limit = 20

  useEffect(() => {
    const getImages = async () => {
      setLoading(true)
      try {
        const response = await fetchImages(currentPage, limit)
        setImages(response.images)
        setTotalPages(Math.ceil(response.total / limit))
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setLoading(false)
      }
    }

    getImages()
  }, [currentPage])

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Campus Gallery</h1>

      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="image-grid">
          {images.map((item) => (
            <div key={item.id} className="image-card">
              <img src={item.imageUrl || "/placeholder.svg"} alt={`Image ${item.id}`} className="image" />
              <p className="image-text">{item.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default CampusGallery


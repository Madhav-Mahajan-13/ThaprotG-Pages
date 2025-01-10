import React from "react";
import "../styling/AlumProject/Pagination.css"
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React, { useState } from "react";
import "../styling/AlumProject/SearchBar.css"
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call onSearch to pass the query to parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for projects..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

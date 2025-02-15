import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/context.jsx";
import "../styling/SearchInterface.css"

function UserCard({ user, onConnect }) {
  const { backendHost } = useContext(MyContext);

  return (
    <div className="si-user-card">
      <div className="si-user-info">
        <img
          src={backendHost + user.profile_picture || "/placeholder.svg?height=56&width=56"}
          alt={`${user.first_name}'s profile`}
          className="si-avatar"
        />
        <div className="si-user-name">
          <Link to="/userInfo" state={{ username: user.username }}>
            {user.first_name} {user.last_name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if search was triggered
  const { backendHost } = useContext(MyContext);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`${backendHost}/api/user/search/${searchQuery}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await performSearch();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  const handleConnect = (userId) => {
    console.log(`Connecting with user ${userId}`);
    setOpenSnackbar(true);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="si-container">
      <form onSubmit={handleSearch} className="si-search-form">
        <div className="si-input-wrapper">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleInputChange}
            className="si-search-input"
          />
          <button type="submit" className="si-search-button" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="si-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="si-clear-section">
          <button onClick={handleClear} className="si-clear-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="si-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Clear Results
          </button>
        </div>
      )}

      <div className="si-results">
        {loading ? (
          <p className="si-loading">Loading...</p>
        ) : (
          <>
            {searchResults.map((user) => (
              <UserCard user={user} onConnect={handleConnect} key={user.id} />
            ))}
            {searchResults.length === 0 && hasSearched && !loading && (
              <p className="si-no-results">No users found</p>
            )}
          </>
        )}
      </div>

      {openSnackbar && (
        <div className="si-snackbar">
          Connection request sent successfully
          <button onClick={() => setOpenSnackbar(false)} className="si-snackbar-close">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
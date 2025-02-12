import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { MyContext } from "../context/context.jsx"
import "../styling/SearchInterface.css"


function UserCard({ user, onConnect }) {
  const { backendHost } = useContext(MyContext)

  return (
    <div className="user-card">
      <div className="user-info">
        <img
          src={backendHost+user.profile_picture || "/placeholder.svg?height=56&width=56"}
          alt={`${user.first_name}'s profile`}
          className="user-avatar"
        />
        <div className="user-name">
        <Link to='/userInfo' state={{username : user.username}}>
        {user.first_name} {user.last_name}
        </Link>
        </div>
      </div>
      <button className="connect-button" onClick={() => onConnect(user.id)}>
        Connect
      </button>
    </div>
  )
}

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)
  const { backendHost } = useContext(MyContext)

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${backendHost}/api/user/search/${searchQuery}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      setSearchResults(data.data || [])
    } catch (error) {
      console.error("Error fetching users:", error.message)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = (userId) => {
    console.log(`Connecting with user ${userId}`)
    setOpenSnackbar(true)
  }

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="search-interface">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="clear-results">
          <button onClick={handleClear} className="clear-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="clear-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Clear Results
          </button>
        </div>
      )}

      <div className="search-results">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <>
            {searchResults.map((user) => (
              <UserCard user={user} onConnect={handleConnect} key={user.id} />
            ))}
            {searchResults.length === 0 && searchQuery && !loading && <p className="no-results">No users found</p>}
          </>
        )}
      </div>

      {openSnackbar && (
        <div className="snackbar">
          Connection request sent successfully
          <button onClick={() => setOpenSnackbar(false)} className="snackbar-close">
            ×
          </button>
        </div>
      )}
    </div>
  )
}


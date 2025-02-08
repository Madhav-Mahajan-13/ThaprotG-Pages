import React, { useState, useEffect } from "react"
import UserSearch from "../components/admin/UserSearch.jsx"
import UserTable from "../components/admin/UserTable.jsx"
import EventForm from "../components/admin/EventForm.jsx"
// import ProjectSection from "../components/admin/ProjectSection.jsx"
import "../styling/admin/AdminPage.css"

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Fetch users and projects from the database
    fetchUsers()
    fetchProjects()
  }, [])

  const fetchUsers = async () => {
    // Implement the API call to fetch users from the database
    // For now, we'll use dummy data
    const dummyUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      // Add more dummy users as needed
    ]
    setUsers(dummyUsers)
    setFilteredUsers(dummyUsers)
  }

  const fetchProjects = async () => {
    // Implement the API call to fetch projects from the database
    // For now, we'll use dummy data
    const dummyProjects = [
      { id: 1, name: "Project A", description: "Description of Project A" },
      { id: 2, name: "Project B", description: "Description of Project B" },
      // Add more dummy projects as needed
    ]
    setProjects(dummyProjects)
  }

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  const handleEventSubmit = (eventData) => {
    // Implement the API call to post the event to the database
    console.log("Event submitted:", eventData)
    // You would typically update the state or refetch data here
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <UserSearch onSearch={handleSearch} />
      <UserTable users={filteredUsers} />
      <EventForm onSubmit={handleEventSubmit} />
      {/* <ProjectSection projects={projects} /> */}
    </div>
  )
}

export default AdminPage


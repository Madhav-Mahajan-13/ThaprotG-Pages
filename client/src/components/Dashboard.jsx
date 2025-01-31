import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import "../styling/Dashboard.css"
import { MyContext } from "../context/context"
import { FaUser, FaEnvelope, FaGraduationCap, FaBook, FaEdit, FaSave, FaTimes } from "react-icons/fa"

export const Dashboard = () => {
  const { userId } = useContext(MyContext)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    graduation_year: "",
    bio: "",
    profilePicture: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/dashboard/${userId}`)

        setFormData({
          firstName: response.data.first_name || "",
          lastName: response.data.last_name || "",
          email: response.data.email || "",
          graduation_year: response.data.graduation_year || "",
          bio: response.data.bio || "",
          profilePicture: response.data.profile_picture || "https://picsum.photos/200/300",
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/user/dashboard/${userId}`, formData)
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error saving data:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading your profile...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {isEditing ? (
        <div className="edit-form">
          <h2>
            <FaEdit /> Edit Profile
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                <FaUser /> First Name
              </label>
              <input
                className="form-input"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                <FaUser /> Last Name
              </label>
              <input
                className="form-input"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="graduation_year">
                <FaGraduationCap /> Graduation Year
              </label>
              <input
                className="form-input"
                type="number"
                id="graduation_year"
                name="graduation_year"
                value={formData.graduation_year}
                onChange={handleInputChange}
                min="1900"
                max="2099"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bio">
                <FaBook /> Bio
              </label>
              <textarea
                className="form-textarea"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
              ></textarea>
            </div>

            <div className="button-group">
              <button type="button" className="button primary-button" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
              <button type="button" className="button secondary-button" onClick={() => setIsEditing(false)}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-view">
          <div className="profile-image-container">
            <img className="profile-image" src={formData.profilePicture || "/placeholder.svg"} alt="Profile" />
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <span className="field-label">
                <FaUser /> Name
              </span>
              <p className="field-value">{`${formData.firstName} ${formData.lastName}` || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">
                <FaEnvelope /> Email
              </span>
              <p className="field-value">{formData.email || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">
                <FaGraduationCap /> Graduation Year
              </span>
              <p className="field-value">{formData.graduation_year || "Not provided"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">
                <FaBook /> Bio
              </span>
              <p className="field-value">{formData.bio || "No bio provided"}</p>
            </div>

            <div className="button-group">
              <button className="button primary-button" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard


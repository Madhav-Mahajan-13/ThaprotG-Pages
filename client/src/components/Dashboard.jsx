import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import '../styling/Dashboard.css';
import { MyContext } from "../context/context";

export const Dashboard = () => {
  const {userId}=useContext(MyContext);

  const __id=userId;
  console.log("dash",__id)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    graduation_year: "",
    bio: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(
          `http://localhost:5000/api/user/dashboard/${__id}`
        );
        console.log(response)

        setFormData({
          firstName: response.data.first_name || "",
          lastName: response.data.last_name || "",
          email: response.data.email || "",
          graduation_year: response.data.graduation_year || "",
          bio: response.data.bio || "",
          profilePicture: response.data.profile_picture || "https://picsum.photos/200/300",
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      console.log("formdata ==== ",formData)
      await axios.post(`http://localhost:5000/api/user/dashboard/${userId}`, formData);
      setIsEditing(false);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {isEditing ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First Name:
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
                Last Name:
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
                Email:
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
                Date of Graduation:
              </label>
              <input
                className="form-input"
                type="number"
                id="graduation_year"
                name="graduation_year"
                value={formData.graduation_year}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bio">
                Bio:
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
              <button
                type="button"
                className="button primary-button"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="button secondary-button"
                onClick={handleBack}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-view">
          <div className="profile-image-container">
            <img
              className="profile-image"
              src={formData.profilePicture}
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <span className="field-label">First Name</span>
              <p className="field-value">{formData.firstName || "N/A"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">Last Name</span>
              <p className="field-value">{formData.lastName || "N/A"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">Email</span>
              <p className="field-value">{formData.email || "N/A"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">Date of Graduation</span>
              <p className="field-value">{formData.graduation_year || "N/A"}</p>
            </div>

            <div className="profile-field">
              <span className="field-label">Bio</span>
              <p className="field-value">{formData.bio || "N/A"}</p>
            </div>

            <div className="button-group">
              <button
                className="button primary-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

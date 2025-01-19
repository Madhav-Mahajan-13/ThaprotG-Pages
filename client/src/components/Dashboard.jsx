import React, { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    graduationDate: "",
    bio: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/dashboard/${userId}`
        );

        // Populate formData with API response
        setFormData({
          firstName: response.data.first_name || "",
          lastName: response.data.last_name || "",
          email: response.data.email || "",
          graduationDate: response.data.date_of_graduation || "",
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
      await axios.put(`http://localhost:5000/api/user/${userId}`, formData);
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <form>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="graduationDate">Date of Graduation:</label>
              <input
                type="number"
                id="graduationDate"
                name="graduationDate"
                value={formData.graduationDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <button type="button" onClick={handleSave}>
                Save
              </button>
              <button type="button" onClick={handleBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>
            <img
              src={formData.profilePicture}
              alt="Profile"
              style={{ width: "200px", height: "300px" }}
            />
          </div>
          <div>
            <p>First Name: {formData.firstName || "N/A"}</p>
          </div>
          <div>
            <p>Last Name: {formData.lastName || "N/A"}</p>
          </div>
          <div>
            <p>Email: {formData.email || "N/A"}</p>
          </div>
          <div>
            <p>Date of Graduation: {formData.graduationDate || "N/A"}</p>
          </div>
          <div>
            <p>Bio: {formData.bio || "N/A"}</p>
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

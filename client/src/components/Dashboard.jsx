import React, { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationDate: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          graduationDate: response.data.graduationDate || "",
          bio: response.data.bio || "",
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
      await axios.put(`/api/users/${userId}`, formData);
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                type="date"
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
            <img src="https://picsum.photos/200/300" alt="Profile" />
          </div>
          <div>
            <p>Name: {formData.name || "N/A"}</p>
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

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/context";
import { FaUser, FaEnvelope, FaGraduationCap, FaBook, FaEdit, FaSave, FaTimes, FaImage, FaPhone, FaLink } from "react-icons/fa";
import "../styling/Dashboard.css"
export const Dashboard = () => {
  const { userId } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    personalEmail: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    linkedinUrl: "",
    graduationYear: "",
    bio: "",
    profilePicture: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [countryCode, setCountryCode] = useState("+1");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/dashboard/${userId}`);
        const data = response.data;

        const phoneMatch = data.phone_number?.match(/^(\+\d+)\s(.+)/);
        setCountryCode(phoneMatch ? phoneMatch[1] : "+1");

        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          username: data.username || "",
          email: data.email || "",
          personalEmail: data.personal_email || "",
          phoneNumber: phoneMatch ? phoneMatch[2] : data.phone_number || "",
          additionalPhoneNumber: data.additional_phone_number || "",
          linkedinUrl: data.linkedin_url || "",
          graduationYear: data.graduation_year || "",
          bio: data.bio || "",
          profilePicture: data.profile_picture || "https://picsum.photos/200/300",
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage({ type: "error", text: "Failed to load profile data" });
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

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phoneNumber: e.target.value });
  };

  const handleAdditionalPhoneChange = (e) => {
    setFormData({ ...formData, additionalPhoneNumber: e.target.value });
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const submitFormData = new FormData();

      submitFormData.append("firstName", formData.firstName);
      submitFormData.append("lastName", formData.lastName);
      submitFormData.append("personalEmail", formData.personalEmail);
      submitFormData.append("phoneNumber", `${countryCode} ${formData.phoneNumber}`);
      submitFormData.append("additionalPhoneNumber", `${countryCode} ${formData.additionalPhoneNumber}`);
      submitFormData.append("linkedinUrl", formData.linkedinUrl);
      submitFormData.append("graduationYear", formData.graduationYear);
      submitFormData.append("bio", formData.bio);

      if (selectedImage) {
        submitFormData.append("image", selectedImage);
      }

      const response = await axios.post(
        `http://localhost:5000/api/user/dashboard/${userId}`,
        submitFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.user) {
        setFormData((prev) => ({
          ...prev,
          profilePicture: response.data.user.profile_picture || prev.profilePicture,
        }));
      }

      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    }
  };

  if (isLoading) {
    return <div className="dashboard-container"><div className="loading">Loading your profile...</div></div>;
  }

  return (
    <div className="dashboard-container">
      {message.text && <div className={`${message.type}-message`}>{message.text}</div>}

      {isEditing ? (
        <div className="edit-form">
          <h2><FaEdit /> Edit Profile</h2>
          <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
              <label className="form-label"><FaImage /> Profile Picture</label>
              <div className="profile-image-container">
                <img src={imagePreview || formData.profilePicture || "/placeholder.svg"} width={200} alt="Profile Preview" className="profile-image" />
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label"><FaUser /> First Name</label>
              <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaUser /> Last Name</label>
              <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaUser /> Username</label>
              <input className="form-input" type="text" value={formData.username} disabled />
            </div>

            <div className="form-group">
              <label className="form-label"><FaEnvelope /> Email</label>
              <input className="form-input" type="email" value={formData.email} disabled />
            </div>

            <div className="form-group">
              <label className="form-label"><FaEnvelope /> Personal Email</label>
              <input className="form-input" type="email" name="personalEmail" value={formData.personalEmail} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaPhone /> Phone Number</label>
              <div className="phone-input">
                <select value={countryCode} onChange={handleCountryCodeChange}>
                  <option value="+1">+1 (USA)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                </select>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><FaGraduationCap /> Graduation Year</label>
              <input className="form-input" type="number" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaLink /> LinkedIn URL</label>
              <input className="form-input" type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} />
            </div>

            

            {/* <div className="form-group">
              <label className="form-label"><FaPhone /> Phone Number</label>
              <div className="phone-input">
                <select value={countryCode} onChange={handleCountryCodeChange}>
                  <option value="+1">+1 (USA)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                </select>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneChange} />
              </div>
            </div> */}

            <div className="form-group">
              <label className="form-label"><FaPhone /> Additional Phone Number</label>
              <input type="text" name="additionalPhoneNumber" value={formData.additionalPhoneNumber} onChange={handleAdditionalPhoneChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaBook /> Bio</label>
              <textarea className="form-textarea" name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
            </div>

            <div className="button-group">
              <button className="button primary-button" onClick={handleSave}><FaSave /> Save</button>
              <button className="button secondary-button" onClick={() => setIsEditing(false)}><FaTimes /> Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-view">
      <div className="profile-image-container">
          <img className="profile-image" src={"http://localhost:5000"+formData.profilePicture || "/placeholder.svg"} alt="Profile"  />
        </div>
    
        <div className="profile-details">
          <div className="profile-field">
            <span className="field-label"><FaUser /> Name</span>
            <p className="field-value">
              {formData.firstName || "Unavailable"} {formData.lastName || ""}
            </p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaUser /> Username</span>
            <p className="field-value">{formData.username || "Unavailable"}</p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaEnvelope /> Email</span>
            <p className="field-value">{formData.email || "Unavailable"}</p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaEnvelope /> Personal Email</span>
            <p className="field-value">{formData.personalEmail || "Unavailable"}</p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaPhone /> Phone Number</span>
            <p className="field-value">
              {formData.phoneNumber ? `${countryCode} ${formData.phoneNumber}` : "Unavailable"}
            </p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaLink /> LinkedIn</span>
            <p className="field-value">
              {formData.linkedinUrl ? (
                <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  {formData.linkedinUrl}
                </a>
              ) : "Unavailable"}
            </p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaGraduationCap /> Graduation Year</span>
            <p className="field-value">{formData.graduationYear || "Unavailable"}</p>
          </div>
    
          <div className="profile-field">
            <span className="field-label"><FaBook /> Bio</span>
            <p className="field-value">{formData.bio || "No bio provided"}</p>
          </div>
    
          
          <div className="profile-field">
            <span className="field-label"><FaPhone /> Additional Phone Number</span>
            <p className="field-value">{formData.additionalPhoneNumber ? `${countryCode} ${formData.additionalPhoneNumber}` : "Unavailable"}</p>
          </div>
        </div>

          

          <div className="button-group">
            <button className="button primary-button" onClick={() => setIsEditing(true)}><FaEdit /> Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


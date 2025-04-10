import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/context";
import { FaUser, FaEnvelope, FaGraduationCap, FaBook, FaEdit, FaSave, FaTimes, FaImage, FaPhone, FaLink, FaCheckCircle } from "react-icons/fa";
import "../styling/Dashboard.css";

// Toast component
const Toast = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`dashboard-toast ${visible ? 'toast-visible' : ''} ${type}`}>
      <div className="toast-content">
        {type === "success" && <FaCheckCircle className="toast-icon" />}
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

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
  const [toast, setToast] = useState({ visible: false, type: "", message: "" });
  const [countryCode, setCountryCode] = useState("+1");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(backendHost + `/api/user/dashboard/${userId}`);
        const data = response.data;

        const phoneMatch = data.phone_number?.match(/^(\+\d+)\s(.+)/);
        setCountryCode(phoneMatch ? phoneMatch[1] : "+1");
        
        const additionalPhoneMatch = data.additional_phone_number?.match(/^(\+\d+)\s(.+)/);
        setAdditionalCountryCode(additionalPhoneMatch ? additionalPhoneMatch[1] : "+1");

        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          username: data.username || "",
          email: data.email || "",
          personalEmail: data.personal_email || "",
          phoneNumber: phoneMatch ? phoneMatch[2] : data.phone_number || "",
          additionalPhoneNumber: additionalPhoneMatch ? additionalPhoneMatch[2] : data.additional_phone_number || "",
          linkedinUrl: data.linkedin_url || "",
          graduationYear: data.graduation_year || "",
          bio: data.bio || "",
          profilePicture: data.profile_picture || "https://picsum.photos/200/300",
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast("error", "Failed to load profile data");
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
  };

  const hideToast = () => {
    setToast({ visible: false, type: "", message: "" });
  };

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

  const handleAdditionalCountryCodeChange = (e) => {
    setAdditionalCountryCode(e.target.value);
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
      submitFormData.append("additionalPhoneNumber", `${additionalCountryCode} ${formData.additionalPhoneNumber}`);
      submitFormData.append("linkedinUrl", formData.linkedinUrl);
      submitFormData.append("graduationYear", formData.graduationYear);
      submitFormData.append("bio", formData.bio);

      if (selectedImage) {
        submitFormData.append("image", selectedImage);
      }

      const response = await axios.post(
        backendHost +  `/api/user/dashboard/${userId}`,
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
      showToast("success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      showToast("error", "Failed to update profile. Please try again.");
    }
  };

  const currentYear = new Date().getFullYear();

  if (isLoading) {
    return <div className="dashboard-container"><div className="loading">Loading your profile...</div></div>;
  }

  return (
    <div className="dashboard-container">
      <Toast 
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />

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
                <select 
                  className="country-code-select" 
                  value={countryCode} 
                  onChange={handleCountryCodeChange}
                >
                  <option value="+1" className="country-option">🇺🇸 +1 (USA)</option>
                  <option value="+91" className="country-option">🇮🇳 +91 (India)</option>
                  <option value="+44" className="country-option">🇬🇧 +44 (UK)</option>
                  <option value="+61" className="country-option">🇦🇺 +61 (Australia)</option>
                  <option value="+7" className="country-option">🇷🇺 +7 (Russia)</option>
                  <option value="+33" className="country-option">🇫🇷 +33 (France)</option>
                  <option value="+49" className="country-option">🇩🇪 +49 (Germany)</option>
                  <option value="+81" className="country-option">🇯🇵 +81 (Japan)</option>
                  <option value="+86" className="country-option">🇨🇳 +86 (China)</option>
                  <option value="+82" className="country-option">🇰🇷 +82 (South Korea)</option>
                  <option value="+39" className="country-option">🇮🇹 +39 (Italy)</option>
                  <option value="+34" className="country-option">🇪🇸 +34 (Spain)</option>
                  <option value="+52" className="country-option">🇲🇽 +52 (Mexico)</option>
                  <option value="+55" className="country-option">🇧🇷 +55 (Brazil)</option>
                  <option value="+971" className="country-option">🇦🇪 +971 (UAE)</option>
                  <option value="+65" className="country-option">🇸🇬 +65 (Singapore)</option>
                  <option value="+64" className="country-option">🇳🇿 +64 (New Zealand)</option>
                  <option value="+31" className="country-option">🇳🇱 +31 (Netherlands)</option>
                  <option value="+46" className="country-option">🇸🇪 +46 (Sweden)</option>
                  <option value="+47" className="country-option">🇳🇴 +47 (Norway)</option>
                </select>
                <input 
                  type="text" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handlePhoneChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><FaGraduationCap /> Graduation Year</label>
              <div className="graduation-year-container">
                <input 
                  className="form-input" 
                  type="number" 
                  name="graduationYear" 
                  value={formData.graduationYear} 
                  onChange={handleInputChange}
                  min="1956"
                  max={currentYear + 10}
                />
                <span className="year-helper-text">
                  Year must be between 1956 and {currentYear + 10}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><FaLink /> LinkedIn URL</label>
              <input className="form-input" type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><FaPhone /> Additional Phone Number</label>
              <div className="phone-input">
                <select 
                  className="country-code-select" 
                  value={additionalCountryCode} 
                  onChange={handleAdditionalCountryCodeChange}
                >
                  <option value="+1" className="country-option">🇺🇸 +1 (USA)</option>
                  <option value="+91" className="country-option">🇮🇳 +91 (India)</option>
                  <option value="+44" className="country-option">🇬🇧 +44 (UK)</option>
                  <option value="+61" className="country-option">🇦🇺 +61 (Australia)</option>
                  <option value="+7" className="country-option">🇷🇺 +7 (Russia)</option>
                  <option value="+33" className="country-option">🇫🇷 +33 (France)</option>
                  <option value="+49" className="country-option">🇩🇪 +49 (Germany)</option>
                  <option value="+81" className="country-option">🇯🇵 +81 (Japan)</option>
                  <option value="+86" className="country-option">🇨🇳 +86 (China)</option>
                  <option value="+82" className="country-option">🇰🇷 +82 (South Korea)</option>
                  <option value="+39" className="country-option">🇮🇹 +39 (Italy)</option>
                  <option value="+34" className="country-option">🇪🇸 +34 (Spain)</option>
                  <option value="+52" className="country-option">🇲🇽 +52 (Mexico)</option>
                  <option value="+55" className="country-option">🇧🇷 +55 (Brazil)</option>
                  <option value="+971" className="country-option">🇦🇪 +971 (UAE)</option>
                  <option value="+65" className="country-option">🇸🇬 +65 (Singapore)</option>
                  <option value="+64" className="country-option">🇳🇿 +64 (New Zealand)</option>
                  <option value="+31" className="country-option">🇳🇱 +31 (Netherlands)</option>
                  <option value="+46" className="country-option">🇸🇪 +46 (Sweden)</option>
                  <option value="+47" className="country-option">🇳🇴 +47 (Norway)</option>
                </select>
                <input 
                  type="text" 
                  name="additionalPhoneNumber" 
                  value={formData.additionalPhoneNumber} 
                  onChange={handleAdditionalPhoneChange}
                  placeholder="Additional Phone Number"
                />
              </div>
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
              <span className="field-label"><FaPhone /> Additional Phone</span>
              <p className="field-value">
                {formData.additionalPhoneNumber ? `${additionalCountryCode} ${formData.additionalPhoneNumber}` : "Unavailable"}
              </p>
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
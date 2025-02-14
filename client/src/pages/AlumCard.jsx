import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import '../styling/AlumniCard.css';

const AlumniSystem = () => {
    const [showCard, setShowCard] = useState(false);
    const [formData, setFormData] = useState({
      membershipNo: '',
      name: '',
      year: '',
      degree: '',
      dateOfBirth: '',
      image: null
    });
    
    const cardRef = useRef(null);
    const barcodeRef = useRef(null);
  
    useEffect(() => {
      if (showCard && formData.membershipNo) {
        JsBarcode(barcodeRef.current, formData.membershipNo, {
          format: "CODE128",
          displayValue: false,
          width: 2,
          height: 50
        });
      }
    }, [showCard, formData.membershipNo]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            image: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowCard(true);
    };
  
    const downloadCard = async () => {
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `alumni-card-${formData.membershipNo}.png`;
        link.click();
      }
    };
  
    return (
      <div className='main-content'>
        <div className="alumni-system">
          <div className="container">
            {!showCard ? (
              <div className="form-container">
                <h1 className="form-title">Alumni Card Generator</h1>
                <form onSubmit={handleSubmit} className="alumni-form">
                  <div className="form-group">
                    <label>Membership No.</label>
                    <input
                      type="text"
                      name="membershipNo"
                      value={formData.membershipNo}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter membership number"
                    />
                  </div>
  
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
  
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter graduation year"
                    />
                  </div>
  
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your degree"
                    />
                  </div>
  
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
  
                  <div className="form-group">
                    <label>Upload Photo</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                        className="file-input"
                      />
                      <div className="file-input-label">Choose a file</div>
                    </div>
                  </div>
  
                  <button type="submit" className="submit-btn">
                    Generate Alumni Card
                  </button>
                </form>
              </div>
            ) : (
              <div className="card-section">
                <div ref={cardRef} className="alumni-card">
                  <div className="card-header">
                    <div className="logo-section">
                      <div className="logo">
                        <span className="logo-text">ARC</span>
                      </div>
                      <h2 className="org-name">ALUMNI RELATIONS CELL</h2>
                    </div>
  
                    <div className="card-content">
                      <div className="info-grid">
                        <div className="info-group">
                          <span className="info-label">Membership No:</span>
                          <span className="info-value">{formData.membershipNo}</span>
                        </div>
                        <div className="info-group">
                          <span className="info-label">Name:</span>
                          <span className="info-value">{formData.name}</span>
                        </div>
                        <div className="info-group">
                          <span className="info-label">Year:</span>
                          <span className="info-value">{formData.year}</span>
                        </div>
                        <div className="info-group">
                          <span className="info-label">Degree:</span>
                          <span className="info-value">{formData.degree}</span>
                        </div>
                        <div className="info-group">
                          <span className="info-label">Date of Birth:</span>
                          <span className="info-value">{formData.dateOfBirth}</span>
                        </div>
                      </div>
                    </div>
  
                    {formData.image && (
                      <div className="profile-image-container">
                        <img src={formData.image} alt="Profile" className="profile-image" />
                      </div>
                    )}
  
                    <svg ref={barcodeRef} className="barcode"></svg>
                  </div>
  
                  <div className="card-footer">
                    <span className="signature">Head Alumni Engagement</span>
                    <span className="signature">SAIC President</span>
                  </div>
                </div>
  
                <button onClick={downloadCard} className="download-btn">
                  Download Card
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default AlumniSystem;

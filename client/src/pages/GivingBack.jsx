// AlumGiveBack.jsx
import React, { useContext, useEffect, useState } from 'react';
import '../styling/GivingBack.css';
import { MyContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AlumGiveBack = () => {

  const {isAlum}  = useContext(MyContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!isAlum){
      toast.info("NOT AN ALUMNI");
      setTimeout(() => {
        navigate("/");
      },100)
    }
  },[])

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    reason: ''
  });

  const initiatives = [
    {
      title: "Mentorship Program",
      description: "Guide current students through their academic journey and career path. Share your industry experience and insights.",
      link: "https://mentorship.thapar.edu/"
    },
    {
      title: "Guest Lectures",
      description: "Share your expertise by conducting guest lectures or workshops in your field of specialization.",
      link: ""
    },
   
    {
      title: "Internship Opportunities",
      description: "Provide internship opportunities to students at your organization. Help them gain real-world experience.",
      link: ""
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='main-content'>
                <div className="container">
      <h1 className="main-heading">How Alumni Can Give Back</h1>
      
      <div className="cards-container">
        {initiatives.map((initiative, index) => (
          <div 
            key={index}
            className={`card ${initiative.link ? 'clickable' : 'disabled'}`}
            onClick={() => initiative.link && window.open(initiative.link, '_blank')}
          >
            <h2>{initiative.title}</h2>
            <p>{initiative.description}</p>
            {initiative.link ? (
              <span className="link-indicator">Click to visit →</span>
            ) : (
              <span className="coming-soon">Coming Soon. Contact Alumni Relations Head for further details</span>
            )}
          </div>
        ))}
      </div>

      <div className="form-container">
        <h2>Schedule a Visit</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Preferred Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason for Visit</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AlumGiveBack;
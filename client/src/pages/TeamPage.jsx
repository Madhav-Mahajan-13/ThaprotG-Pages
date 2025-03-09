  import React from 'react';
  import '../styling/Teampage.css';
  import { Github, Linkedin, Instagram } from 'lucide-react';


    const TeamPage = () => {
    const ebMembers = [
      {
        name: "Mansi Bhargava",
        position: "Head Of Alumni Relations",
        image: "http://localhost:5000/uploads/team/MANSI.jpg",
        description: "Leading with vision and passion to drive innovation.",
        social: {
          instagram: "https://instagram.com/kushal",
          linkedin: "https://linkedin.com/in/kushal",
          github: "https://github.com/kushal"
        }
      },
      {
        name: "Bikash Kumar Mahato",
        position: "Alumni Relations Officer",
        image: "http://localhost:5000/uploads/team/BIKASH.jpg",
        description: "Leading with vision and passion to drive innovation.",
        social: {
          instagram: "https://instagram.com/kushal",
          linkedin: "https://linkedin.com/in/kushal",
          github: "https://github.com/kushal"
        }
      },
      {
        name: "Kushal Preet Sallan",
        position: "President",
        image: "http://localhost:5000/uploads/team/KUSHAL.jpg",
        description: "Leading with vision and passion to drive innovation.",
        social: {
          instagram: "https://instagram.com/kushal",
          linkedin: "https://linkedin.com/in/kushal",
          github: "https://github.com/kushal"
        }
      },
      {
        name: "Sara Agnihotri",
        position: "Vice President",
        image: "http://localhost:5000/uploads/team/SARA.jpg",
        description: "Bringing teams together to achieve excellence.",
        social: {
          instagram: "https://instagram.com/sara",
          linkedin: "https://linkedin.com/in/sara",
          github: "https://github.com/sara"
        }
      },
      {
        name: "Parul",
        position: "Design Head",
        image: "http://localhost:5000/uploads/team/PARUL.jpg",
        description: "Crafting visual experiences that inspire and engage.",
        social: {
          instagram: "https://instagram.com/parul",
          linkedin: "https://linkedin.com/in/parul",
          github: "https://github.com/parul"
        }
      },
      {
        name: "Stavya Goel",
        position: "Head of External Affairs",
        image: "http://localhost:5000/uploads/team/STAVYA.jpg",
        description: "Building partnerships and expanding our reach.",
        social: {
          instagram: "https://instagram.com/stavya",
          linkedin: "https://linkedin.com/in/stavya",
          github: "https://github.com/stavya"
        }
      },
      {
        name: "Sahil Saini",
        position: "Head of Internal Affairs",
        image: "http://localhost:5000/uploads/team/SAHIL.jpg",
        description: "Fostering collaboration and team development.",
        social: {
          instagram: "https://instagram.com/sahil",
          linkedin: "https://linkedin.com/in/sahil",
          github: "https://github.com/sahil"
        }
      },
      {
        name: "Nipun Jain",
        position: "Head of Internal Affairs",
        image: "http://localhost:5000/uploads/team/NIPUN.jpg",
        description: "Strengthening internal processes and team dynamics.",
        social: {
          instagram: "https://instagram.com/nipun",
          linkedin: "https://linkedin.com/in/nipun",
          github: "https://github.com/nipun"
        }
      },
      {
        name: "Jatin Arora",
        position: "Cultural Head",
        image: "http://localhost:5000/uploads/team/JATIN.jpg",
        description: "Enriching our community through cultural initiatives.",
        social: {
          instagram: "https://instagram.com/madhav.culture",
          linkedin: "https://linkedin.com/in/madhav-culture",
          github: "https://github.com/madhav-culture"
        }
      },
      {
        name: "Madhav Mahajan",
        position: "Technical Head",
        image: "https://picsum.photos/id/1015/300/300",
        description: "Driving technical innovation and excellence.",
        social: {
          instagram: "https://instagram.com/madhav.tech",
          linkedin: "https://linkedin.com/in/madhav-tech",
          github: "https://github.com/madhav-tech"
        }
      }
    ];
    const departments = {
      tech: [
          { name: "Anjali Kumari", linkedin: "https://www.linkedin.com/in/anjali-kumari-aa7668323", github: "https://github.com/Anjalikumari990" },
          { name: "Jidugu Sriharisesh", linkedin: "https://www.linkedin.com/in/jsrihari", github: "https://github.com/Hari21-Tech" },
          { name: "Rakshit Dhamija", linkedin: "https://www.linkedin.com/in/rakshit-dhamija-870b39286", github: "https://github.com/Rakshit-Dhamija" }
      ],
      design: [
          { name: "Jahanvi Singhal", linkedin: "https://www.linkedin.com/in/jahanvi-singhal-33981b29a", github: "https://github.com/Jahanvi-15" },
          { name: "Dishita Bansal", linkedin: "https://www.linkedin.com/in/dishita-bansal", github: "https://github.com/Dishita-Bansal/Dishita-Bansal" },
          { name: "Angad Bir Singh", linkedin: "https://www.linkedin.com/in/angad-bir-singh-45507a281", github: "https://github.com/Angadbir101" },
          { name: "Sharnya Goel", linkedin: "https://www.linkedin.com/in/sharnya-goel-b96697284", github: "https://github.com/sharnyagoel19" },
          { name: "Kushagrh Rohilla", linkedin: "https://www.linkedin.com/in/kushagrhrohilla/", github: "https://github.com/Infurnux" },
          { name: "Bani", linkedin: "https://www.linkedin.com/in/bani-b42658327", github: "https://github.com/Bani-229" }
      ],
      media: [
          { name: "Agami", linkedin: "https://www.linkedin.com/in/agami-garg-608692308/", github: "https://github.com/agamigarg" },
          { name: "Mehakdeep Singh", linkedin: "https://www.linkedin.com/in/mehakdeep-singh-086042215", github: "NA" },
          { name: "Arpita Bhalla", linkedin: "https://www.linkedin.com/in/arpita-bhalla-14310b352", github: "NA" },
          { name: "Ansh Bansal", linkedin: "https://www.linkedin.com/in/anshbansal1002", github: "https://github.com/That-GeekyGuy" },
          { name: "Tanish Puri", linkedin: "https://www.linkedin.com/in/tanish-puri-b195252a6", github: "https://github.com/tanishh18" },
          { name: "Prisha Bharti", linkedin: "www.linkedin.com/in/prisha-bharti-8527b02b9", github: "NA" },
          { name: "Daksh Agrawal", linkedin: "www.linkedin.com/in/daksh-agrawal-797134216", github: "https://github.com/Dakshya2006" }
      ],
      content: [
          { name: "Anmol Sethi", linkedin: "https://www.linkedin.com/in/anmol-sethi-79ba03228/", github: "https://github.com/Anmolas1402" },
          { name: "Harshil Jain", linkedin: "https://www.linkedin.com/in/harshil-jain-13a87731a/", github: "https://github.com/jainharshil34" },
          { name: "Parnika Bharadvaja", linkedin: "https://www.linkedin.com/in/parnika-bharadvaja-14029b343", github: "NA" },
          { name: "Khusboo Gaur", linkedin: "https://www.linkedin.com/in/khusboo-gaur-5728a9332", github: "https://github.com/itskhusboo" },
          { name: "Nanki Kaur", linkedin: "https://www.linkedin.com/in/nanki-kaur-am8960", github: "NA" }
      ]
  };
  
  

    return (
      <div className='main-content'>
          <div className="team-page">
        <section className="hero-section">
          <img 
            src="http://localhost:5000/uploads/team/TEAM.jpg" // Team group photo
            alt="Team Group Photo" 
            className="team-group-photo"
          />
          {/* <div className="hero-overlay">
            <h1>Our Amazing Team</h1>
            <p>Together we CONNECT CREATE CONTRIBUTE</p>
          </div> */}
        </section>

        <section className="eb-section">
          <h2>Executive Board</h2>
          <div className="eb-grid">
            {ebMembers.map((member, index) => (
              <div key={index} className="eb-card">
                <div className="eb-image-container">
                  <img src={member.image} alt={member.name} className="eb-photo" />
                </div>
                <div className="eb-info">
                  <h3>{member.name}</h3>
                  <h4>{member.position}</h4>
                  <p>{member.description}</p>
                  <div className="social-links">
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram size={20} />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="departments-section">
          <h2>Our Departments</h2>
          <div className="departments-grid">
        {Object.keys(departments).map((dept) => (
          <div className="department" key={dept}>
            <h3>{dept.charAt(0).toUpperCase() + dept.slice(1)} Team</h3>
            <ul>
              {departments[dept].map((member, index) => (
                <li key={index}>
                  {member.name} -  <a href={member.linkedin} target="_blank"> <Linkedin size={20}  /></a>{"   "}
                  {member.github !== "NA" && (
                    <>
                      | <a href={member.github} target="_blank"><Github size={20} /></a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
        </section>
      </div>
      </div>
    
    );
  };

  export default TeamPage;
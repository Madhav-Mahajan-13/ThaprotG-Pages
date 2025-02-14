import React from 'react';
import '../styling/Podcast.css';

const Podcast = () => {
  const podcasts = [
    {
      id: 1,
      title: "Podcast 2",
      host: "Kushal Preet Sallan ",
      guest: "MR. Anil Sharma",
      description: `We at Thapar Alumni Relations Cell are thrilled to present another episode of our podcast series, "Engineers Beyond Engineering", featuring our esteemed alumnus, Er. Anil Sharma, CEO of 22nd Century Technologies.  `,
      youtubeLink: "https://www.youtube.com/embed/RXMYMLckwKc", // ✅ Valid YouTube link
      date: "2024-07-10"
    },
    {
      id: 2,
      title: "Podcast 1",
      host: "Veni Tiwari",
      guest: "Dr. Seema Bawa",
      description:` Presenting to you Alumni Relations Cell's podcast series, "Engineers Beyond Engineering," where our host talks to various personalities in engineering and beyond, providing students with valuable insights, useful stats, and a slight sprinkle of nostalgia.`,
      youtubeLink: "https://www.youtube.com/embed/95ACDs6vm5w", // 🔄 Replace with a valid YouTube ID
      date: "2024-04-12"
    },
  ];
return (
    <div className="main-content">
      <div className="podcast-container">
        <header className="podcast-header">
          <h1>Our Podcast Channel</h1>
          <p>Join us for inspiring conversations with amazing guests</p>
        </header>
        
        <div className="podcast-grid">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-card">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="100%"
                  src={podcast.youtubeLink}
                  title={podcast.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy" // ✅ Improves performance
                />
              </div>
              <div className="podcast-info">
                <h2>{podcast.title}</h2>
                <div className="meta-info">
                  <p><strong>Host:</strong> {podcast.host}</p>
                  <p><strong>Guest:</strong> {podcast.guest}</p>
                  <p><strong>Date:</strong> {new Date(podcast.date).toLocaleDateString()}</p> {/* ✅ Better date format */}
                </div>
                <p className="description">{podcast.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podcast;

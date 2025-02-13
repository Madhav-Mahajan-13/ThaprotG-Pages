import React from 'react';
import '../styling/Podcast.css';

const Podcast = () => {
  const podcasts = [
    {
      id: 1,
      title: "The Future of AI",
      host: "Sarah Johnson",
      guest: "Dr. Mark Thompson",
      description: "Exploring the latest developments in artificial intelligence and its impact on society.",
      youtubeLink: "https://www.youtube.com/embed/RXMYMLckwKc", // ✅ Valid YouTube link
      date: "2024-02-14"
    },
    {
      id: 2,
      title: "Sustainable Living",
      host: "Sarah Johnson",
      guest: "Emma Green",
      description: "Discussion about practical steps towards environmental consciousness and sustainable lifestyle choices.",
      youtubeLink: "https://www.youtube.com/embed/RXMYMLckwKc", // 🔄 Replace with a valid YouTube ID
      date: "2024-02-07"
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

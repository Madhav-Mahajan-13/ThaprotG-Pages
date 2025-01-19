import React from 'react';
import '../styling/UserProfile.css'; // Import a CSS file for styling

const UserProfile = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    title: 'Software Engineer',
    location: 'San Francisco, CA',
    profilePicture: 'https://picsum.photos/200/300',
    bio: 'Passionate developer with experience in full-stack development. Love solving real-world problems.',
    connections: [
      { id: 1, name: 'Jane Smith', title: 'Product Manager' },
      { id: 2, name: 'Michael Brown', title: 'Data Scientist' },
    ],
    posts: [
      { id: 1, content: 'Excited to start a new project on AI!', date: '2 days ago' },
      { id: 2, content: 'Had a great experience at the tech conference.', date: '5 days ago' },
    ],
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className="profile-picture"
        />
        <div className="profile-info">
          <h1>{user.name}</h1>
          <h3>{user.title}</h3>
          <p>{user.location}</p>
          <p className="bio">{user.bio}</p>
        </div>
        <div className="action-buttons">
          <button className="connect-button">Connect</button>
          <button className="message-button">Message</button>
        </div>
      </div>

      {/* Connections Section */}
      <div className="connections-section">
        <h2>Connections</h2>
        <ul>
          {user.connections.map((connection) => (
            <li key={connection.id}>
              <div className="connection">
                <span className="connection-name">{connection.name}</span> -{' '}
                <span className="connection-title">{connection.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Activity Section */}
      <div className="activity-section">
        <h2>Recent Posts</h2>
        <ul>
          {user.posts.map((post) => (
            <li key={post.id} className="post">
              <p>{post.content}</p>
              <small>{post.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;

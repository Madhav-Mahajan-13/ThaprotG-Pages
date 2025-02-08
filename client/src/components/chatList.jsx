import React from 'react';
import { Link } from 'react-router-dom';

function ChatList({ connections }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Chats</h2>
      <ul className="space-y-2">
        {connections.map((connection) => (
          <li key={connection.id}>
            <Link to={`/chat/${connection.id}`} className="block p-2 bg-gray-100 rounded hover:bg-gray-200">
              {connection.username}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/search" className="block mt-4 text-blue-500">Search Users</Link>
    </div>
  );
}

export default ChatList;
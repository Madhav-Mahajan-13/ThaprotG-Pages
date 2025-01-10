import React from 'react';
import { Link } from 'react-router-dom';
import Chat from './Chat';

const NavBar = () => {
    return ( <>
     <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="px-3 py-2 rounded hover:bg-gray-700">Home</Link>
        <Link to="/alumproject" className="px-3 py-2 rounded hover:bg-gray-700">PROJECTS</Link>
        <Link to="/studentproject" className="px-3 py-2 rounded hover:bg-gray-700">PROJECTS BY STUDENTS</Link>
        <Link to="/campusgallery" className="px-3 py-2 rounded hover:bg-gray-700">GALLERY</Link>
      </div>
      <Chat></Chat>
    </nav>
    </> );
}
 
export default NavBar;

;



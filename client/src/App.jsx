/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Landing from './pages/Landing';
import StudentProject from './pages/StudentProject';
import AlumAchievement from './pages/AlumAchievement';
import AlumProject from './pages/AlumProject';
import CampusGallery from './pages/CampusGallery';
import SignIn from './pages/login';
import SignUp from './pages/register';
import Forgot from './pages/forgot';
import OTP from './pages/OTP';
import Reset from './pages/reset';
import MyProvider from './context/provider';
// import UserProfile from './pages/ProfilePage';
// import Dashboard from './pages/ProfilePage';
import UserProfile from './pages/UserPage';
import Home from './pages/home';
import { useEffect,useState } from 'react';
import UserDashboard from './pages/userprofilepage';
import Internships from './pages/Internship';
import Placements from './pages/Placement';
import TeamPage from './pages/TeamPage';
import Podcast from './pages/Podcast';
import AlumniSystem from './pages/AlumCard';
// import io from 'socket.io-client';



const router = createBrowserRouter([
  {
    path:"/",
    element:<Landing/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'studentProject',
        element:<StudentProject/>
      },
      {
        path:'alumachievements',
        element:<AlumAchievement/>
      },
      {
        path:'alumproject',
        element:<AlumProject/>
      },
      {
        path:'campusgallery',
        element:<CampusGallery/>
      },
      {
        path:'profile',
        element:<UserProfile/>
      },
      {
        path:'userInfo',
        element:<UserDashboard/>
      },
      {
        path:'internship',
        element:<Internships/>
      },
      {
        path:'placement',
        element:<Placements/>
      },
      {
        path:'team',
        element:<TeamPage/>
      },
      {
        path:'podcast',
        element:<Podcast/>
      },
      {
        path:'alumcard',
        element:<AlumniSystem/>
      },
    ]
  },
  {
    path:"/login",
    element:<SignIn/>
  },
  {
    path:"/register",
    element:<SignUp/>
  },
  {
    path:'/forgot',
    element:<Forgot/>
  },
  {
    path:"/otp/:token/:email",
    element:<OTP />
  },
  {
    path:"passreset/:token/:email",
    element:<Reset/>
  }
]);

function App() {

  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState([]);

  return (
    <MyProvider>
      <RouterProvider router={router}/>
    </MyProvider>
  );
}

export default App;

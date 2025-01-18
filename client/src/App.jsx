/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom';
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Landing from './pages/Landing';
import StudentProject from './pages/StudentProject';
import AlumAchievement from './pages/AlumAchievement';
import AlumProject from './pages/AlumProject';
import CampusGallery from './pages/CampusGallery';
import NavBar from './components/NavBar';
import SignIn from './pages/login';
import SignUp from './pages/register';
import Forgot from './pages/forgot';
import OTP from './pages/OTP';
import Reset from './pages/reset';
import MyProvider from './context/provider';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Landing/>,
    children:[
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
      }
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
  return (
    <MyProvider>
      <RouterProvider router={router}/>
    </MyProvider>
  );
}

export default App;

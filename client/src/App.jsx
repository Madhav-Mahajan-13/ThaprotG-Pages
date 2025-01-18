/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Landing from './pages/Landing';
import StudentProject from './pages/StudentProject';
import AlumAchievement from './pages/AlumAchievement';
import AlumProject from './pages/AlumProject';
import CampusGallery from './pages/CampusGallery';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import SignIn from './pages/login';
import SignUp from './pages/register';
import Forgot from './pages/forgot';
import OTP from './pages/OTP';
import Reset from './pages/reset';

function App() {
  return (
    <>
    <Router>
    {/* <NavBar/> */}
    <SideBar/>
    <Container>
    <Routes>
    <Route path="/" element={<Landing/>} ></Route>
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/forgot' element={<Forgot/>}/>
    <Route path='/otp/:token/:email' element={<OTP/>}/>
    <Route path='/passreset/:token/:email' element={<Reset/>}/>
    <Route path="/studentproject" element={<StudentProject/>} ></Route>
    <Route path="/alumachievements" element={<AlumAchievement/>} ></Route>
    <Route path="/alumproject" element={<AlumProject/>} ></Route>
    <Route path="/campusgallery" element={<CampusGallery/>} ></Route>
    </Routes>

    </Container>

    </Router>
    </>
  );
}

export default App;

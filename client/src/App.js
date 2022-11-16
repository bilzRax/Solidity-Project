import React from 'react'
import "./style/style.scss"
import Home from "./components/Home.js"
import Doctor from "./components/Doctor"
import Patient from "./components/Patient"
import Receptionist from "./components/Receptionist"
import Nurse from "./components/Nurse"
import Attendant from "./components/Attendant"
import Laboratory from "./components/Laboratory"
import Pharmacy from "./components/Pharmacy"

import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
function App() {
  return (
  <>
  <Router>
    <Routes>   
        <Route path="/" element={<Home/>}/>
        <Route path="/doctor" element={<Doctor/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/patient" element={<Patient/>}/>
        <Route path="/receptionist" element={<Receptionist/>}/>
        <Route path="/nurse" element={<Nurse/>}/>
        <Route path="/attendant" element={<Attendant/>}/>
        <Route path="/laboratory" element={<Laboratory/>}/>
        <Route path="/pharmacy" element={<Pharmacy/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;

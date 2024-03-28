import React from "react";
import Login from './components/Login'
import './css/navbar.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { ClaimantExpenses } from "./components/ClaimantExpenses";
import { CreateClaim } from "./components/CreateClaim";
import { Profile } from "./components/Profile";
import { LineManagerExpenses } from "./components/LineManagerExpenses";

// Dear Aivaras Barcys,
// I have been humbled.
// What remains here is the ashes of a hopeful man
// who thought that he can conquer the realm of routing.
// Scattered here are my hopes and dreams. Please avenge me.
// Please fix my errors so that my legacy can be cleansed.

// Dear Aivaras Barcys,
// Upon resting my person and my mind, I was able
// to corrct my ways. Routing, I believe, works as intended.

//Dear Mohamed,
//I've been thinking of this each night,
//Sleep has become a difficulty of recent days,
//Today as i opened this file and upon further inspection
//my face has been filled with joy, you have done well

//Yours Faithully,
// Aivaras Barcys

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path="/ClaimantExpenses" exact element={<ClaimantExpenses />} />
        <Route path="/CreateClaim" exact element={<CreateClaim />} />
        <Route path="/Profile" exact element={<Profile />} />
        <Route path="/LineManagerExpenses" exact element={<LineManagerExpenses />} />
      </Routes>
    </Router>
)
}

export default App

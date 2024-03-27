import React from "react";
import Login from './components/Login'
import NavBar from './components/navbar'
import './css/navbar.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { ClaimantExpenses } from "./components/ClaimantExpenses";
import { CreateExpense } from "./components/CreateExpense";
import { Profile } from "./components/Profile";

// Dear Aivaras Barcys,
// I have been humbled.
// What remains here is the ashes of a hopeful man
// who thought that he can conquer the realm of routing.
// Scattered here are my hopes and dreams. Please avenge me.
// Please fix my errors so that my legacy can be cleansed.

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path="/ClaimantExpenses" exact element={<ClaimantExpenses />} />
        <Route path="/CreateExpense" exact element={<CreateExpense />} />
        <Route path="/Profile" exact element={<Profile />} />
        {/* TODO (Mo): Add Line Manager buttons in the navbar  */}
        {/* <Route path='/expenses' exact element={<Expense/>}/> */}
      </Routes>
    </Router>

    // <Router>
    //   <Routes>
        // <Route path="/" element={<ClaimantExpenses />} />
        // <Route path="/CreateExpense" element={<CreateExpense />} />
        // <Route path="/Profile" element={<Profile />} />
    //   </Routes>
    // </Router>

    // <NavBar /> 
)
}

export default App

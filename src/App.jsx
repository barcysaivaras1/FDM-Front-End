import React from "react";
import Login from './components/Login'
import './css/navbar.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ClaimantExpenses } from "./components/ClaimantExpenses";
import { ClaimantViewExpense } from "./components/ClaimantViewExpense";
import { CreateClaim } from "./components/CreateClaim";
import { Profile } from "./components/Profile";
import { LineManagerExpenses } from "./components/LineManagerExpenses";

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>} />
        <Route path="/ClaimantExpenses" exact element={<ClaimantExpenses />} />
        <Route path="/ClaimantViewExpense" exact element={<ClaimantViewExpense />} />
        {/* temporary, just for development */}
        <Route path="/CreateClaim" exact element={<CreateClaim />} />
        <Route path="/Profile" exact element={<Profile />} />
        <Route path="/LineManagerExpenses" exact element={<LineManagerExpenses />} />
      </Routes>
    </Router>
)
}

export default App

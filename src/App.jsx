import React from "react";
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>} />
        <Route path="/Profile" exact element={<Profile />} />
      </Routes>
    </Router>
)
}

export default App
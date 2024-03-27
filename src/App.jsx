import { useState } from 'react'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Expense from './components/ClaimantExpenses';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/expenses' exact element={<Expense/>}/>
      </Routes>
    </Router>

  )
}

export default App

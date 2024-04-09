import Login from './components/Login'
import './css/NavBar.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { MyExpenses } from "./components/MyExpenses.jsx";
import { ViewExpense } from "./components/ViewExpense.jsx";
import { CreateClaim } from "./components/CreateClaim";
import { Profile } from "./components/Profile";
import { LineManagerExpenses } from "./components/LineManagerExpenses";
import { ReviewExpense } from './components/ReviewExpense';
import NotFound from "./components/NotFound";
import RequireAuth from './components/RequireAuth';
import Unauthorised from './components/Unauthorised';
import Admin from "./components/Admin.jsx";

function App() {
  return (
    <Router>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
      </style>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/unauthorised' element={<Unauthorised />} />

        <Route element={<RequireAuth allowedRoles={[1, 2, 4]} />}>
          <Route path="/my-expenses" exact element={<MyExpenses />} />
          <Route path="/view-expense" exact element={<ViewExpense />} />
          <Route path="/create-claim" exact element={<CreateClaim />} />
          <Route path="/profile" exact element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[2]} />}>
          <Route path="/line-manager-expenses" exact element={<LineManagerExpenses />} />
          <Route path="/review-claim" exact element={<ReviewExpense />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[4]} />}>
          <Route path="/admin" exact element={<Admin />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

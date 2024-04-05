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
import { ReviewExpense } from './components/ReviewExpense';
import NotFound from "./components/NotFound";
import RequireAuth from './components/RequireAuth';
import Unauthorised from './components/Unauthorised';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/unauthorised' element={<Unauthorised />} />

        <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
          <Route path="/my-expenses" exact element={<ClaimantExpenses />} />
          <Route path="/view-expense" exact element={<ClaimantViewExpense />} />
          <Route path="/create-claim" exact element={<CreateClaim />} />
          <Route path="/profile" exact element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[2]} />}>
          <Route path="/line-manager-expenses" exact element={<LineManagerExpenses />} />
          <Route path="/review-claim" exact element={<ReviewExpense />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

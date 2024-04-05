import '../css/navbar.css';
import { ProfileIcon, ViewExpensesIcon, CreateExpenseIcon } from "../assets/Icons";
import FDMLogo from "../assets/FDMLogo.png";
import { NavLink } from "react-router-dom";
import httpClient from '../httpClient';

async function logoutBackend() {
    await httpClient.post("/api/auth/logout")
    .then(function (response) {
        console.log("Response:  ", response);
    })
    .catch(function (error) {
        console.log("Error: ", error);
    })
}

function NavBar() {
    return (
        <nav>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
            </style>
            <img src={FDMLogo} id="FDMLogo" />

            {/* All this needs now is an if statement to check whether user is a line manager */}
            <NavLink to="/line-manager-expenses" className="DesktopIdentifiers">
                <div>
                    <p>Review Expenses</p>
                </div>
            </NavLink>

            <NavLink to="/my-expenses">
                <div>
                    <ViewExpensesIcon />
                    <p className="MobileIdentifiers">View</p>
                    <p className="DesktopIdentifiers">My Expenses</p>
                </div>
            </NavLink>

            <NavLink to="/create-claim">
                <div>
                    <CreateExpenseIcon />
                    <p className="DesktopIdentifiers">Create Claim</p>
                </div>
            </NavLink>

            <NavLink to="/profile">
                <div>
                    <ProfileIcon />
                    <p>Profile</p>
                </div>
            </NavLink>

            <NavLink to="/make-a-report" className="DesktopIdentifiers">
                <div>
                    <p>Make a Report</p>
                </div>
            </NavLink>

            <NavLink to="/" id="LogoutBtn" onClick={() => { logoutBackend() }}>
                <p>Logout</p>
            </NavLink>
        </nav>

    )
}

export default NavBar;

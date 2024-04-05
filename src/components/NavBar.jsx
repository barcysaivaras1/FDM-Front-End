import '../css/navbar.css';
import { ProfileIcon, ViewExpensesIcon, CreateExpenseIcon } from "../assets/Icons";
import FDMLogo from "../assets/FDMLogo.png";
import { NavLink } from "react-router-dom";
import httpClient from '../httpClient';
import useAuth from '../hooks/useAuth';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

function NavBar() {
    const { setAuth } = useAuth();
    const { auth } = useContext(AuthContext); // auth.role = 1 (employee), auth.role = 2 (Line Manager)

    async function logoutBackend() {
        await httpClient.post("/api/auth/logout")
        .then(function (response) {
            setAuth({})
            console.log("Response:  ", response);
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    }

    return (
        <nav>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
            </style>
            <img src={FDMLogo} id="FDMLogo" />

            {/* All this needs now is an if statement to check whether user is a line manager - DONE :3 */}
            {
                auth.role === 2 && (
                    <NavLink to="/line-manager-expenses" className="DesktopIdentifiers">
                        <div>
                            <p>Review Expenses</p>
                        </div>
                    </NavLink>
                )
            }

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

            <NavLink to="/" id="LogoutBtn" onClick={() => { logoutBackend() }}>
                <p>Logout</p>
            </NavLink>
        </nav>

    )
}

export default NavBar;

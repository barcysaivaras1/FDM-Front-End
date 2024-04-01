import React from "react";
import '../css/navbar.css';
import { ProfileIcon, ViewExpensesIcon, CreateExpenseIcon } from "../assets/Icons";
import FDMLogo from "../assets/FDMLogo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { getApiURL } from "./api";

async function logoutBackend () {
    await axios.post(
        getApiURL("/auth/logout")
    ) 
    .then(function(response){
        console.log("Response:  ", response);
    })
    .catch(function(error){
        console.log("Error: ", error);
    })
}

function NavBar () {
    return(
        <nav>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
        </style>
            <img src={FDMLogo} />

        {/* All this needs now is an if statement to check whether user is a line manager */}
            <NavLink to="/LineManagerExpenses"  className="DesktopIdentifiers">
                <div>
                    <p>Review Expenses</p>
                </div>
            </NavLink>

            <NavLink to="/ClaimantExpenses">
                <div>
                    <ViewExpensesIcon/>
                    <p className="MobileIdentifiers">View</p>
                    <p className="DesktopIdentifiers">My Expenses</p>
                </div>
            </NavLink>

            <NavLink to="/CreateClaim">
                <div>
                    <CreateExpenseIcon />
                    <p className="DesktopIdentifiers">Create Claim</p>
                </div>
            </NavLink>

            <NavLink to="/Profile">
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

import React from "react";
import '../css/navbar.css';
import { ProfileIcon, ViewExpensesIcon, CreateExpenseIcon } from "../assets/Icons";
import FDMLogo from "../assets/FDMLogo.png";
import { NavLink } from "react-router-dom";

function navbar () {
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
                    <p className="DesktopIdentifiers">View Expenses</p>
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

        </nav>

    )
}

export default navbar;
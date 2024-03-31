import React from "react";
import "../css/ClaimantViewExpense.css"
import NavBar from "./navbar";

export function ClaimantViewExpense() {
    return (
        <div>
            <NavBar/> 
            <div id="ExpenseBody">
                <p>Hello View Expense World!</p>
            </div>
        </div>
    )
}
import React from "react";
import "../css/ClaimantExpenses.css"
import NavBar from "./navbar";

export function ClaimantExpenses() {
    return (
        <div>
            <NavBar/> 
            <div id="ExpensesBody">
                <p>Hello Expenses World!</p>
            </div>
        </div>
    )
}
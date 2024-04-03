import React from "react";
import "../css/ClaimantViewExpense.css"
import NavBar from "./NavBar";
import { BackButtonIcon, PendingIcon, RejectedIcon, AcceptedIcon } from "../assets/Icons"
import { NavLink } from "react-router-dom";

export function ClaimantViewExpense() {
    document.title = "View Expense"
    return (
        <div>
            <NavBar/> 
            <div id="ExpenseBody">
                <div id="TitleBar">
                    <NavLink to={"/my-expenses"}><BackButtonIcon/></NavLink>
                    <h1>View Expense</h1>
                </div>
                <hr/>
                <div id="Status">
                    <PendingIcon/>
                    <h2>Status</h2>
                    <p>Pending</p>
                </div>
                <div id="ExpenseDetails">
                    <h2>Expense</h2>
                    <p>Fortnite Card</p>

                    <h2>Date</h2>
                    <p>12/03/2024 - 01:48PM</p>

                    <h2>Amount</h2>
                    <p>$19 <i className="AI">AI detected amount to be $18.</i></p>

                    <h2>Type</h2>
                    <p>Mental Wellbeing</p>

                    <h2>Description</h2>
                    <p>I have been working very hard for this company, and have even took several overtime shifts to make money for our stakeholders, but all these hours have been taking a toll in my mental health. As I have a minor fortnite addiction, I believe that treating myself to a fortnite card will help bring my spirits back up so that I can get back to getting our company ‘that victory royale’</p>

                    <h2>Evidence</h2>
                    <a href="https://i.postimg.cc/3x97Gfsf/120320240148.jpg">120320240148.jpeg</a>
                </div>

                {/* Should only appear if claim is rejected */}
                <div id="AppealClaim">
                    <p>Appeal this claim</p>
                </div>
            </div>
        </div>
    )
}
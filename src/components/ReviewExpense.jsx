import React from "react";
import "../css/ReviewExpense.css"
import NavBar from "./navbar";
import exampleEvidence from "../assets/exampleEvidence.png";

export function ReviewExpense() {
    // test datas
    const exampleExpense = {type:"Mental Wellbeing",date_time:"2024/2/21 - 1:10PM",currency_type:"£",amount:"19",item:"Fortnite Card",state:"Accepted",desc:"I have been working very hard for this company, and have even took several overtime shifts to make money for our stakeholders, but all these hours have been taking a toll in my mental health. As I have a minor fortnite addiction, I believe that treating myself to a fortnite card will help bring my spirits back up so that I can get back to getting our company ‘that victory royale’"}

    return(
        <div className="REContainer">
            <NavBar />
            <div className="REBody">
                <h1>Review Expense</h1>

                <h2>Date</h2>
                    <p>{exampleExpense.date_time}</p>

                <h2>Expense</h2>
                    <p>{exampleExpense.item}</p>

                <h2>Amount</h2>
                    <p>{exampleExpense.amount}</p>

                <h2>Status</h2>
                    <p>{exampleExpense.state}</p>

                <h2>Type</h2>
                    <p>{exampleExpense.type}</p>

                <h2>Description</h2>
                    <p>{exampleExpense.desc}</p>

                <h2>Evidence</h2>
                    <img  src={exampleEvidence} alt="example evidence picture"/>

                <p>Reject Claim</p>
                <p>Accept Claim</p>
            </div>
        </div>
    )
}


import React, { useState } from "react";
import "../css/LineManagerExpenses.css"
import NavBar from "./NavBar";

export function LineManagerExpenses() {
    const [displayType, setDisplayType] = useState({state:"All Expenses"});

    const updateDisplayTypeAllExpenses = () => {
        setDisplayType({ ...displayType, state:"All Expenses"});
    };

    const updateDisplayTypeToReview = () => {
        setDisplayType({...displayType, state:"To Review"})
    };

    const updateDisplayTypeDenied = () => {
        setDisplayType({...displayType, state:"Denied"})
    };

    // test datas
    const exampleExpense = {type:"Mental Wellbeing", date_time:"2024/2/21 - 1:10PM",currency_type:"£",amount:"19",title:"Fortnite Card",state:"Accepted"}
    const exampleExpense2 = {type:"Productivity",date_time:"2024/2/21 - 2:20PM",currency_type:"$",amount:"3499.99",title:"Apple Vision Pro",state:"Denied"}
    const exampleExpense3 = {type:"Gamer",date_time:"2024/2/21 - 3:30PM",currency_type:"Robux",amount:"399",title:"Cool Sunglasses",state:"Pending"}
    const bigList = [];
    for (let i = 0; i < 100; i++) {
        bigList.push(exampleExpense, exampleExpense2, exampleExpense3);
    }

    return (
        <div className = 'LMEContainer'>
            <NavBar />
            <div className='LMEBody'>
                <h1 className = 'title'>Expenses</h1>

                <div className = 'optionsList'>
                    <button onClick = {updateDisplayTypeToReview} className="option">To Review</button>
                    <button onClick = {updateDisplayTypeAllExpenses} className="option">All Expenses</button>
                    <button onClick = {updateDisplayTypeDenied} className="option">Denied Claims</button>  
                </div>

                <div className = "columnTitles">
                    <p>Date</p> <p>Expense</p> <p>Amount</p> <p>Type</p> <p>State</p>
                </div>

                <div className = "scrollboxExpenses"><ExpenseList listOfClaims = {bigList} displayType = {displayType}/></div>
            </div>
        </div>
    )
}

const Expense = (props) =>{
    return(
        <ul className = 'claimInfo'>
            <li>{props.expense.date_time}</li>
            <li>{props.expense.title}</li>
            <li>{props.expense.currency_type+props.expense.amount}</li>
            <li>{props.expense.type}</li>
            <li>{props.expense.state}</li>
        </ul>
    )
}

const ExpenseList = (props) =>{
    if (props.displayType.state == "All Expenses") {
        return Array.from(
            { length: props.listOfClaims.length },
            (_, i) => (
                <Expense expense = {props.listOfClaims[i]} />
            )
        );
    }

    if (props.displayType.state == "To Review"){
        let filteredList = [];
        props.listOfClaims.map(element=>{
            if(element.state == "Pending" ){
              filteredList.push(element);
            }
        })

        return Array.from(
            { length: filteredList.length },
            (_, i) => (
                <Expense expense = {filteredList[i]} />
            )
        );
    }

    if (props.displayType.state == "Denied"){
        let filteredList = [];
        props.listOfClaims.map(element=>{
            if(element.state == "Denied" ){
              filteredList.push(element);
            }
        })

        return Array.from(
            { length: filteredList.length },
            (_, i) => (
                <Expense expense = {filteredList[i]} />
            )
        );
    }

}
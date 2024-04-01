import React from "react";
import "../css/LineManagerExpenses.css"
import NavBar from "./NavBar";

export function LineManagerExpenses() {

    // test datas
    const exampleExpense = {date_time:"2024/2/21 - 1:10PM",currency_type:"£",amount:"19",desc:"Fortnite Card",state:"Accepted"}
    const exampleExpense2 = {date_time:"2024/2/21 - 2:20PM",currency_type:"$",amount:"3499.99",desc:"Apple Vision Pro",state:"Declined"}
    const exampleExpense3 = {date_time:"2024/2/21 - 3:30PM",currency_type:"Robux",amount:"399",desc:"Cool Sunglasses",state:"Pending"}

    const exampleExpenseList = [exampleExpense, exampleExpense2, exampleExpense3]
    const bigList = [];
    bigList.push(exampleExpense2,exampleExpense3)
    for (let i = 0; i < 100; i++) {
        bigList.push(exampleExpense);
    }
    const displayType = {type:"To Review"};

    return (
        <div className = 'LMEContainer'>
            <NavBar />
            <div className='LMEBody'>
                <h1 id= 'Title'>Expenses</h1>

                <div className = 'optionsList'>
                    <p className="option">To Review</p>
                    <p className="option">All Expenses</p>    
                </div>

                <div className = "columnTitles">
                    <p>Date</p> <p>Expense</p> <p>Amount</p> <p>Type</p>
                </div>

                <div className = "scrollboxExpenses"><ExpenseList eel = {bigList} displayType = {displayType}/></div>
            </div>
        </div>
    )
}

const Expense = (props) =>{
    return(
        <div className = 'expense'>
            <div className = 'claimInfo'>
                <div className = 'claimDate'>{props.expense.date_time}</div>
                <div className = 'moneyInfo'>{props.expense.currency_type+props.expense.amount}</div>
                <div className = 'description'>{props.expense.desc}</div>
            </div>
        </div>
    )
}

const ExpenseList = (props) =>{
    if (props.displayType.type == "All Expenses") {
        console.log("should not be here");
        return Array.from(
            { length: props.eel.length },
            (_, i) => (
                <div className = 'expensesList'>
                    <Expense expense = {props.eel[i]} />
                </div>
            )
        );
    }
    
    if (props.displayType.type == "To Review"){
            let neweel = [];
            props.eel.map(element=>{
                if(element.state == "Pending" ){
                  neweel.push(element);
                }
            })

            return Array.from(
                { length: neweel.length },
                (_, i) => (
                    <div className = 'expensesList'>
                        <Expense expense = {neweel[i]} />
                    </div>
                )
            );
        }
    }

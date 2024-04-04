import React, { useState } from "react";
import "../css/LineManagerExpenses.css"
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

export function LineManagerExpenses() {
    const updateDisplayType = (value) => {
        setDisplayType({ ...displayType, state:value});
    };

    const [displayType, setDisplayType] = useState({state:"All Expenses"});

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

                <ToggleButton displayType = {displayType} setDisplayType = {setDisplayType} updateDisplayType = {updateDisplayType}/>

                <div className = "columnTitles">
                    <p>Date</p> <p>Expense</p> <p>Amount</p> <p>Type</p> <p>State</p>
                </div>

                <div className = "scrollboxExpenses"><ExpenseList listOfClaims = {bigList} displayType = {displayType}/></div>
            </div>
        </div>
    )
}

const ToggleButton = (props) =>{
    console.log(props.displayType.state)
    if (props.displayType.state == "All Expenses"){
        return(
            <div className = 'optionsList'>
                <button onClick = {() => props.updateDisplayType("To Review")} className="option">To Review</button>
                <button onClick = {() => props.updateDisplayType("All Expenses")} className="optionActive">All Expenses</button>
                <button onClick = {() => props.updateDisplayType("Denied")} className="option">Denied Claims</button>  
                <button onClick = {() => props.updateDisplayType("Accepted")} className="option">Accepted</button>
            </div>
        )
    }
    if (props.displayType.state == "To Review"){
        return(
            <div className = 'optionsList'>
                <button onClick = {() => props.updateDisplayType("To Review")} className="optionActive">To Review</button>
                <button onClick = {() => props.updateDisplayType("All Expenses")} className="option">All Expenses</button>
                <button onClick = {() => props.updateDisplayType("Denied")} className="option">Denied Claims</button>
                <button onClick = {() => props.updateDisplayType("Accepted")} className="option">Accepted</button>
            </div>
        )
    }
    if (props.displayType.state == "Denied"){
        return(
            <div className = 'optionsList'>
                <button onClick = {() => props.updateDisplayType("To Review")} className="option">To Review</button>
                <button onClick = {() => props.updateDisplayType("All Expenses")} className="option">All Expenses</button>
                <button onClick = {() => props.updateDisplayType("Denied")} className="optionActive">Denied Claims</button>  
                <button onClick = {() => props.updateDisplayType("Accepted")} className="option">Accepted</button>
            </div>
        )
    }
    if (props.displayType.state == "Accepted"){
        return(
            <div className = 'optionsList'>
                <button onClick = {() => props.updateDisplayType("To Review")} className="option">To Review</button>
                <button onClick = {() => props.updateDisplayType("All Expenses")} className="option">All Expenses</button>
                <button onClick = {() => props.updateDisplayType("Denied")} className="option">Denied Claims</button>  
                <button onClick = {() => props.updateDisplayType("Accepted")} className="optionActive">Accepted</button>
            </div>
        )
    }
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
                <Link to = "/">
                    <Expense expense = {props.listOfClaims[i]} />
                </Link>
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
                <Link>
                    <Expense expense = {filteredList[i]} />
                </Link>
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
                <Link to ="/">
                    <Expense expense = {filteredList[i]} />
                </Link>
            )
        );
    }

    if (props.displayType.state == "Accepted"){
        let filteredList = [];
        props.listOfClaims.map(element=>{
            if(element.state == "Accepted" ){
              filteredList.push(element);
            }
        })

        return Array.from(
            { length: filteredList.length },
            (_, i) => (
                <Link to ="/">
                    <Expense expense = {filteredList[i]} />
                </Link>
            )
        );
    }

}
import { useState, useEffect } from "react";
import "../css/LineManagerExpenses.css"
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import httpClient from "../httpClient";
import Animate_page from "./Animate-page";

export function LineManagerExpenses() {
    const [expenses, setExpenses] = useState([]);
    let [bigList, setBigList] = useState([]);
    
    async function fetchClaims() {
        await httpClient.get('/api/claims/managed-by')
        .then(function (response) {
            console.log(response);
            setExpenses(response.data.claims);
            setBigList(response.data.claims);
            console.log({bigList})
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    useEffect(() => {
        document.title = 'Claims To Review';
        fetchClaims();
    }, [])

    const updateDisplayType = (value) => {
        setDisplayType({ ...displayType, state:value});
    };

    const [displayType, setDisplayType] = useState({state:"All Expenses"});

    return (
        <div className = 'LMEContainer'>
            <NavBar />
            <Animate_page>
            <div className='LMEBody'>
                <div className = 'title'>Review Expenses</div>

                <ToggleButton displayType = {displayType} setDisplayType = {setDisplayType} updateDisplayType = {updateDisplayType}/>

                <div className = "columnTitles">
                    <p>Date</p> <p>Expense</p> <p>Amount</p> <p>Type</p> <p>State</p>
                </div>

                <div className = "scrollboxExpenses"><ExpenseList listOfClaims = {bigList} displayType = {displayType} className='test' /></div>
            </div>
            </Animate_page>
        </div>
    )
}

const ToggleButton = (props) =>{
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
            <li>{props.expense.date.replace(" 00:00:00 GMT", "")}</li>
            <li>{props.expense.title}</li>
            <li>{props.expense.currency+props.expense.amount}</li>
            <li>{props.expense.expenseType}</li>
            <li>{props.expense.status}</li>
        </ul>
    )
}

const ExpenseList = (props) =>{
    if (props.displayType.state == "All Expenses") {
        return Array.from(
            { length: props.listOfClaims.length },
            (_, i) => (
                <Link to = "/review-claim" state={{ claim: props.listOfClaims[i] }}>
                    <Expense expense = {props.listOfClaims[i]} />
                </Link>
            )
        );
    }

    if (props.displayType.state == "To Review"){
        let filteredList = [];
        props.listOfClaims.map(element=>{
            if(element.status == "Pending" ){
              filteredList.push(element);
            }
        })

        return Array.from(
            { length: filteredList.length },
            (_, i) => (
                <Link to = "/review-claim" state={{ claim: filteredList[i] }}>
                    <Expense expense = {filteredList[i]} />
                </Link>
            )
        );
    }

    if (props.displayType.state == "Denied"){
        let filteredList = [];
        props.listOfClaims.map(element=>{
            if(element.status == "Denied" ){
              filteredList.push(element);
            }
        })

        return Array.from(
            { length: filteredList.length },
            (_, i) => (
                <Link to = "/review-claim" state={{ claim: filteredList[i] }}>
                    <Expense expense = {filteredList[i]} />
                </Link>
            )
        );
    }

    if (props.displayType.state == "Accepted"){
        let filteredList = [];
        props.listOfClaims.map(element=>{
            if(element.status == "Approved" ){
              filteredList.push(element);
            }
        })

        return Array.from(
            { length: filteredList.length },
            (_, i) => (
                <Link to = "/review-claim" state={{ claim: filteredList[i] }}>
                    <Expense expense = {filteredList[i]} />
                </Link>
            )
        );
    }
}
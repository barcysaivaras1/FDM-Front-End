import '../css/ClaimantExpenses.css'
import { FcCollapse } from "react-icons/fc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { GrStatusGood } from "react-icons/gr";
import {React, useState} from 'react';

//Maybe we would retrieve each expense on the server and store them in specific arrays?
var AcceptedArr = []
var PendingArr = []
var RejectedArr = []

function ClaimantExpenses(){

    const expense={date_time:"2024/2/21 - 1:48PM",currency_type:"£",amount:"19",desc:"Fortnite Card",state:"Accepted"}


    return(
        <div className='ViewExpensesPage'>
            <div id='PhoneBox'>
                <h1 id='Title'>View Expenses</h1>
                <div className='expense-column'>
                <div className='h2-collapse'>
                <h2 className='ExpenseType'>Pending</h2>
                <p className='collapse-text'>Collapse All</p>
                <FcCollapse/>
                </div>
                <ExpenseBox expense={expense}/>
                </div>
                <div className='h2-collapse'>
                <h2 className='ExpenseType'>Rejected</h2>
                <p className='collapse-text'>Collapse All</p>
                <FcCollapse/>
                </div>
                <ExpenseBox expense={expense}/>
                <div className='h2-collapse'>
                <h2 className='ExpenseType'>Accepted</h2>
                <p className='collapse-text'>Collapse All</p>
                <FcCollapse/>
                </div>
                <ExpenseBox expense={expense}/>
            </div>
        </div>
    )
}
export default ClaimantExpenses;


const ExpenseBox = (props) =>{

    console.log(props.expense.amount)
    //This should have three states, Pending, Rejected, Accepted
    const [expenseState, setState] = useState("Accepted")
    var img

    //expenseState should be updated by checking the state on server?
    if(props.expense.state === "Pending"){
        img = <AiOutlineClockCircle />
    }
    else if(props.expense.state === "Rejected"){
        img = <RxCrossCircled />
    }
    else if(props.expense.state === "Accepted"){
        img = <GrStatusGood />
    }

    return(
        <div className='claim-box'>
            <div className='Status-Img'>{img}</div>
            <div className='claim-info'>
                <div className='claim-date'>{props.expense.date_time}</div>
                <div>{props.expense.currency_type+props.expense.amount}</div>
                <div>{props.expense.desc}</div>
            </div>
            <div className='claim-arrow'>
                <FcCollapse color='black' />
            </div>
        </div>

    )
}
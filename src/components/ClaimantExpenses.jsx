import '../css/ClaimantExpenses.css'
import { FcCollapse } from "react-icons/fc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { GrStatusGood } from "react-icons/gr";
import {React, useState} from 'react';
import { useTransition,animated } from 'react-spring';

//Maybe we would retrieve each expense on the server and store them in specific arrays?
var AcceptedArr = []
var PendingArr = []
var RejectedArr = []
var counter = 4;


function ClaimantExpenses(){

    //Example expense object, This is used to display
    const [expense, setExpense] = useState({date_time:"2024/2/21 - 1:48PM",currency_type:"£",amount:"19",desc:"Fortnite Card",state:"Accepted"})


    //epic, DELETE THIS ONCE BACKEND WORKS AND POPULATES THE 3 ARRAYS ABOVE
    for(var i=0;i<counter;i++){
    const diffStates = ["Pending","Accepted","Rejected"]
    console.log("Happy")
    var rdmState = diffStates[(Math.floor(Math.random() * diffStates.length))]
    console.log(rdmState)
    const newExpense = {...expense, state: rdmState};
    console.log(newExpense.state)
    
    if (newExpense.state === "Accepted"){
        AcceptedArr.push(newExpense)
    }
    else if (newExpense.state === "Pending"){
        PendingArr.push(newExpense)
    }
    else if (newExpense.state === "Rejected"){
        RejectedArr.push(newExpense)
    }
    }
    counter=0
    //end of EPIC

    

    //To check the state of each type of expense
    const [isCollapsed, setIsCollapsed] = useState({pending:true, rejected:true, accepted:true})

    //Animations
    const transition_pending = useTransition(isCollapsed.pending ,{
        from: {x:-2000,opacty:0, height:0},
        enter: {x:0, opacity:1, height:100},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 400 },
    })
    const transition_rejected = useTransition(isCollapsed.rejected ,{
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:100},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 400 },
    })
    const transition_accepted = useTransition(isCollapsed.accepted ,{
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:100},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 400 },
    })

    //This handles what will happen when the collapse button is pressed
    const handleCollapse = (column) =>{

        if(column === "pending"){
            const swapCollapse = {...isCollapsed, pending  :!(isCollapsed.pending)}
            setIsCollapsed(swapCollapse)
        }
        else if(column === "rejected"){
            const swapCollapse = {...isCollapsed, rejected  :!isCollapsed.rejected}
            setIsCollapsed(swapCollapse)
        }
        else if(column === "accepted"){
            const swapCollapse = {...isCollapsed, accepted  :!isCollapsed.accepted}
            setIsCollapsed(swapCollapse)
        }
    }



    return(
        <div className='ViewExpensesPage'>
            <div id='PhoneBox'>
                <h1 id='Title'>View Expenses</h1>
                <div className='expense-column'>
                    <div className='h2-collapse'>
                        <h2 className='ExpenseType'>Pending</h2>
                        <p className='collapse-text'>{isCollapsed.pending ? "Collapse" : "Expand"}</p>
                        <button onClick={() => handleCollapse("pending")}><FcCollapse/></button>
                    </div>
                    {     
                       PendingArr.map((expense, index) => 
                       (transition_pending((style, item) =>
                       item ? <animated.div style={style}><ExpenseBox key={index} expense={expense}/></animated.div>
                       : '')
                       ))
                    }
                </div>
                <div className='h2-collapse'>
                    <h2 className='ExpenseType'>Rejected</h2>
                    <p className='collapse-text'>{isCollapsed.rejected ? "Collapse" : "Expand"}</p>
                    <button onClick={() => handleCollapse("rejected")}><FcCollapse/></button>
                </div>
                {
                     RejectedArr.map((expense, index) => 
                     (transition_rejected((style, item) =>
                     item ? <animated.div style={style}><ExpenseBox key={index} expense={expense}/></animated.div>
                     : '')
                     ))
                }
                <div className='h2-collapse'>
                    <h2 className='ExpenseType'>Accepted</h2>
                    <p className='collapse-text'>{isCollapsed.accepted ? "Collapse" : "Expand"}</p>
                    <button onClick={() => handleCollapse("accepted")}><FcCollapse/></button>
                    </div>
                { AcceptedArr.map((expense, index) => 
                       (transition_accepted((style, item) =>
                       item ? <animated.div style={style}><ExpenseBox key={index} expense={expense}/></animated.div>
                       : '')
                       ))}
            </div>
        </div>
    )
}
export default ClaimantExpenses;


const ExpenseBox = (props) =>{

    var img

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


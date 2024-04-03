import '../css/ClaimantExpenses.css'
import { FcCollapse } from "react-icons/fc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { GrStatusGood } from "react-icons/gr";
import {React, useEffect, useState} from 'react';
import { useTransition,animated } from 'react-spring';
import NavBar from './NavBar';
import { BiSliderAlt } from "react-icons/bi";
import { AcceptedIcon, ArrowRightIcon, CollapseIcon, PendingIcon, RejectedIcon, FilterIcon } from '../assets/Icons';
import { NavLink } from 'react-router-dom';

//Maybe we would retrieve each expense on the server and store them in specific arrays?
var AcceptedArr = []
var PendingArr = []
var RejectedArr = []

var TempAcceptedArr = []
var TempPendingArr = []
var TempRejectedArr = []


var counter = 14;


export function ClaimantExpenses(){
    document.title = "My Expenses"

    //Example expense object, This is used to display
    const [expense, setExpense] = useState({date_time:"2024/2/21 - 1:48PM",currency_type:"£",amount:151,desc:"Fortnite Card",state:"Accepted"})
    const [apply_filters, setApplyFilters] = useState(false)

    //To check the state of each type of expense
    const [isCollapsed, setIsCollapsed] = useState({pending:true, rejected:true, accepted:true, filter:false})

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

    //Animations
    const transition_pending = useTransition(isCollapsed.pending ,{
        from: {x:-2000,opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 400 },
    })
    const transition_rejected = useTransition(isCollapsed.rejected ,{
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 400 },
    })
    const transition_accepted = useTransition(isCollapsed.accepted ,{
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 400 },
    })
    const transition_filter = useTransition(isCollapsed.filter ,{
        from: {y:500, opacty:0},
        enter: {y:-600, opacity:1},
        leave: {y:500 ,opacity:0},
        config: { duration: 600 },
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
        else if(column === "filter"){
            const swapCollapse = {...isCollapsed, filter  :!isCollapsed.filter}
            setIsCollapsed(swapCollapse)
        }
    }

    //This will remove the filters that were applied, does this by storing
    //the arrays pre-filter and then bringing them back when the filter is removed
    const handleRemoveFilters = () =>{
        setApplyFilters(false)
        AcceptedArr = TempAcceptedArr
        RejectedArr = TempRejectedArr
        PendingArr = TempPendingArr
    }
    //This will apply filters to the expenses
    const handleApplyFilters = (month,amountF,currency) => {
        setApplyFilters(true)
        handleCollapse("filter")

        //Saving what the arrays were pre-filter
        TempAcceptedArr = AcceptedArr
        TempRejectedArr = RejectedArr
        TempPendingArr = PendingArr

        //Filtering based on amount
        if(amountF.Ten){
            AcceptedArr = filterAmountArray(AcceptedArr,10)
            RejectedArr = filterAmountArray(RejectedArr,10)
            PendingArr = filterAmountArray(PendingArr,10)
        }
        else if(amountF.Fifty){
            AcceptedArr = filterAmountArray(AcceptedArr,50)
            RejectedArr = filterAmountArray(RejectedArr,50)
            PendingArr = filterAmountArray(PendingArr,50)
        }
        else if(amountF.Hundred){
            AcceptedArr = filterAmountArray(AcceptedArr,100)
            RejectedArr = filterAmountArray(RejectedArr,100)
            PendingArr = filterAmountArray(PendingArr,100)
        }

        //Filtering based on currency
        if(currency.Pound){
            AcceptedArr = filterCurrencyArray(AcceptedArr,"£")
            RejectedArr = filterCurrencyArray(RejectedArr,"£")
            PendingArr = filterCurrencyArray(PendingArr,"£")
        }
        else if(currency.Dollar){
            AcceptedArr = filterCurrencyArray(AcceptedArr,"$")
            RejectedArr = filterCurrencyArray(RejectedArr,"$")
            PendingArr = filterCurrencyArray(PendingArr,"$")
        }
        else if(currency.Euro){
            AcceptedArr = filterCurrencyArray(AcceptedArr,"€")
            RejectedArr = filterCurrencyArray(RejectedArr,"€")
            PendingArr = filterCurrencyArray(PendingArr,"€")
        }
    }

    function filterAmountArray(arr,amount_to_filter_by){
        const newArr = []
            for(var i=0;i<arr.length;i++){
                if(arr[i].amount < amount_to_filter_by){
                    newArr.push(arr[i])
                }
            }
            return newArr;
    }
    function filterCurrencyArray(arr,currency_to_filter_by){
        const newArr = []
            for(var i=0;i<arr.length;i++){
                if(arr[i].currency_type === currency_to_filter_by){
                    newArr.push(arr[i])
                }
            }
            return newArr;
    }

    return(
        <div>
        <div className='ViewExpensesPage'>
            <div id='PhoneBox'>
                <div id='TitleBox'>
                <h1 id='Title'>View Expenses</h1>
                <button className='Filter-Icon' onClick={() => handleCollapse("filter")}>
                    <FilterIcon />
                </button>
                </div>
                {apply_filters?
                <button className='Filters-Applied-Text' onClick={handleRemoveFilters}>Filters Applied  X</button>
                : ""
                }
                    <div className='expense-column'>
                        <div className='h2-collapse'>
                            <h2 className='ExpenseType'>Pending</h2>
                            <button onClick={() => handleCollapse("pending")}>
                                <p className='collapse-text'>{isCollapsed.pending ? "Collapse" : "Expand"}</p>
                                <CollapseIcon/>
                            </button>
                        </div>
                        {     
                        PendingArr.map((expense, index) => 
                        (transition_pending((style, item) =>
                        item ? <animated.div style={style}>
                            <NavLink to="/view-expense">
                                <ExpenseBox key={index} expense={expense}/>
                            </NavLink>
                        </animated.div>
                        : '')
                        ))
                        }
                    </div>
                    <div className='h2-collapse'>
                        <h2 className='ExpenseType'>Rejected</h2>
                        <button onClick={() => handleCollapse("rejected")}>
                            <p className='collapse-text'>{isCollapsed.rejected ? "Collapse" : "Expand"}</p>
                            <CollapseIcon/>
                        </button>
                    </div>
                    {
                        RejectedArr.map((expense, index) => 
                        (transition_rejected((style, item) =>
                        item ? <animated.div style={style}>
                            <NavLink to="/view-expense">
                                <ExpenseBox key={index} expense={expense}/>
                            </NavLink>
                        </animated.div>
                        : '')
                        ))
                    }
                    <div className='h2-collapse'>
                        <h2 className='ExpenseType'>Accepted</h2>
                        <button onClick={() => handleCollapse("accepted")}>
                            <p className='collapse-text'>{isCollapsed.accepted ? "Collapse" : "Expand"}</p>
                            <CollapseIcon/>
                        </button>
                        </div>
                    { AcceptedArr.map((expense, index) => 
                        (transition_accepted((style, item) =>
                        item ? <animated.div style={style}>
                                <NavLink to="/view-expense">
                                    <ExpenseBox key={index} expense={expense}/>
                                </NavLink>
                            </animated.div>
                        : '')
                        ))}
            </div>                    
            </div>
            {transition_filter((style, item) =>
                       item ? <animated.div style={style}><FilterBox handleCollapse={handleCollapse} handleApplyFilters={handleApplyFilters}/></animated.div>
                       : '')
                       }
            <NavBar/>
        </div>
    )
}
export default ClaimantExpenses;


const ExpenseBox = (props) =>{

    var img

    if(props.expense.state === "Pending"){
        img = <PendingIcon />
    }
    else if(props.expense.state === "Rejected"){
        img = <RejectedIcon />
    }
    else if(props.expense.state === "Accepted"){
        img = <AcceptedIcon />
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
                <ArrowRightIcon/>
            </div>
        </div>

    )
}

const FilterBox = (props) =>{
    //3 states , Month,3Month,6Month
    const [month, setMonth] = useState({Month:false, ThreeMonth:false, SixMonth:false})
    const [amount, setAmount] = useState({Ten:false, Fifty:false, Hundred:false})
    const [currency, setCurrency] = useState({Dollar:false, Pound:false, Euro:false})
    

    const handleFilterApplication = (id) =>{

        //MONTH FILTER SECTION, checks which month filter has been selected
        if(id === "Month"){
            const newMonth = {Month : !(month.Month), SixMonth:false, ThreeMonth:false}
            setMonth(newMonth)
        }
        else if(id === "3Month"){
            const newMonth = {ThreeMonth : !(month.ThreeMonth), Month:false, SixMonth:false}
            setMonth(newMonth)
        }
        else if(id === "6Month"){
            const newMonth = {...month, SixMonth : !(month.SixMonth), Month:false, ThreeMonth:false}
            setMonth(newMonth)
        }

        //AMOUNT FILTER SECTION, checks which amount has been selected
        if(id === "Ten"){
            const newAmount = {Ten : !(amount.Ten), Fifty:false, Hundred:false}
            setAmount(newAmount)
        }
        else if(id === "Fifty"){
            const newAmount = {Fifty : !(amount.Fifty), Ten:false, Hundred:false}
            setAmount(newAmount)
        }
        else if(id === "Hundred"){
            const newAmount = {Hundred : !(amount.Hundred), Fifty:false, Ten:false}
            setAmount(newAmount)
        }

        //AMOUNT FILTER SECTION, checks which amount has been selected
        if(id === "Dollar"){
            const newCurrency = {Dollar: !(currency.Dollar), Pound:false, Euro:false}
            setCurrency(newCurrency)
        }
        else if(id === "Pound"){
            const newCurrency = {Pound: !(currency.Pound), Dollar:false, Euro:false}
            setCurrency(newCurrency)
        }
        else if(id === "Euro"){
            const newCurrency = {Euro: !(currency.Euro), Pound:false, Dollar:false}
            setCurrency(newCurrency)
        }

    }

    //This checks if MONTH object has changed, if it has then it will update the styling
    useEffect(() => {
        if(month.Month){
            document.getElementById("Month").style.background ="white";
            document.getElementById("Month").style.color ="black";
            document.getElementById("3Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("3Month").style.color ="white";
            document.getElementById("6Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("6Month").style.color ="white";
        }
        else if(month.ThreeMonth){
            document.getElementById("3Month").style.background ="white";
            document.getElementById("3Month").style.color ="black";
            document.getElementById("Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Month").style.color ="white";
            document.getElementById("6Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("6Month").style.color ="white";
        }
        else if(month.SixMonth){
            document.getElementById("6Month").style.background ="white";
            document.getElementById("6Month").style.color ="black";
            document.getElementById("3Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("3Month").style.color ="white";
            document.getElementById("Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Month").style.color ="white";
        }
        else{
            document.getElementById("Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Month").style.color  ="white";
            document.getElementById("3Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("3Month").style.color ="white";
            document.getElementById("6Month").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("6Month").style.color ="white";
        }
    }, [month])



    //This checks if AMOUNT object has changed, if it has then it will update the styling
    useEffect(() => {
        if(amount.Ten){
            document.getElementById("Ten").style.background ="white";
            document.getElementById("Ten").style.color ="black";
            document.getElementById("Fifty").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Fifty").style.color ="white";
            document.getElementById("Hundred").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Hundred").style.color ="white";
        }
        else if(amount.Fifty){
            document.getElementById("Fifty").style.background ="white";
            document.getElementById("Fifty").style.color ="black";
            document.getElementById("Ten").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Ten").style.color ="white";
            document.getElementById("Hundred").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Hundred").style.color ="white";
        }
        else if(amount.Hundred){
            document.getElementById("Hundred").style.background ="white";
            document.getElementById("Hundred").style.color ="black";
            document.getElementById("Fifty").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Fifty").style.color ="white";
            document.getElementById("Ten").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Ten").style.color ="white";
        }
        else{
            document.getElementById("Ten").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Ten").style.color  ="white";
            document.getElementById("Fifty").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Fifty").style.color ="white";
            document.getElementById("Hundred").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Hundred").style.color ="white";
        }
    }, [amount])


    //This checks if CURRENCY object has changed, if it has then it will update the styling
    useEffect(() => {
        if(currency.Dollar){
            document.getElementById("Dollar").style.background ="white";
            document.getElementById("Dollar").style.color ="black";
            document.getElementById("Euro").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Euro").style.color ="white";
            document.getElementById("Pound").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Pound").style.color ="white";
        }
        else if(currency.Euro){
            document.getElementById("Euro").style.background ="white";
            document.getElementById("Euro").style.color ="black";
            document.getElementById("Dollar").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Dollar").style.color ="white";
            document.getElementById("Pound").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Pound").style.color ="white";
        }
        else if(currency.Pound){
            document.getElementById("Pound").style.background ="white";
            document.getElementById("Pound").style.color ="black";
            document.getElementById("Euro").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Euro").style.color ="white";
            document.getElementById("Dollar").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Dollar").style.color ="white";
        }
        else{
            document.getElementById("Dollar").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Dollar").style.color  ="white";
            document.getElementById("Euro").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Euro").style.color ="white";
            document.getElementById("Pound").style.background ="hsla(0, 0%, 100%, 0.096)";
            document.getElementById("Pound").style.color ="white";
        }
    }, [currency])
    return(
        <div className='filter-box'>
            <h2 className='Filter-Title'>Filters <button className='Filter-Cross' onClick={() => props.handleCollapse("filter")}><RxCrossCircled/></button></h2>
            <div id='Time-Frame'>
                <h3>TimeFrame</h3>  
                <div id='Time-Buttons'>
                    <button className='month-button' id='Month' onClick={() => handleFilterApplication("Month")}>Last Month</button>
                    <button className='month-button' id='3Month' onClick={() => handleFilterApplication("3Month")}>Last 3 Months</button>
                    <button className='month-button' id='6Month' onClick={() => handleFilterApplication("6Month")}>Last 6 Months</button>
                </div>
            </div>
            <div id='Amount'>
                <h3>Amount</h3>
                <div id='Amount-Buttons'>    
                    <button className='amount-button' id='Ten' onClick={() => handleFilterApplication("Ten")}>&lt; 10</button>
                    <button className='amount-button' id='Fifty' onClick={() => handleFilterApplication("Fifty")}>&lt; 50</button>
                    <button className='amount-button' id='Hundred' onClick={() => handleFilterApplication("Hundred")}>&lt; 100</button>
                </div>
            </div>
            <div id='Currency'>
            <h3>Currency</h3>
                <div id='Currency-Buttons'>
                    <button className='currency-button' id='Dollar' onClick={() => handleFilterApplication("Dollar")}>$</button>
                    <button className='currency-button' id='Pound' onClick={() => handleFilterApplication("Pound")}>£</button>
                    <button className='currency-button' id='Euro' onClick={() => handleFilterApplication("Euro")}>€</button>
                </div>
            </div>
            <div id='Apply-Filters'>
                <button id='Apply-button' onClick={() => props.handleApplyFilters(month,amount,currency)}>Apply Filters</button>
            </div>
        </div>
    )

}


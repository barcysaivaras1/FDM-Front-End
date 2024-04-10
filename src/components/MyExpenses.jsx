import '../css/MyExpenses.css'
import { RxCrossCircled } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { useTransition,animated } from 'react-spring';
import NavBar from './NavBar';
import {
    AcceptedIcon,
    ArrowRightIcon,
    CollapseIcon,
    PendingIcon,
    RejectedIcon,
    FilterIcon,
    DraftIcon,
    ArrowUpIcon, ArrowDownIcon
} from '../assets/Icons';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient';
import Animate_page from './Animate-page';

//Maybe we would retrieve each expense on the server and store them in specific arrays?
var AcceptedArr = []
var PendingArr = []
var RejectedArr = []
var DraftsArr = []

let DraftsArr_Local = [];

function removeDuplicatesFromArray(arr) {
    return arr.filter((value, index) => arr.indexOf(value) === index);
};
function sortDraftsArray() {
    DraftsArr = DraftsArr.sort((a,b) => {
        // confirm date attributes exist
        if (a.date_time === undefined || b.date_time === undefined) {
            return 0;
        }
        // convert to date objects
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        // compare date objects
        return bDate - aDate;
    });
};
async function fetchClaims (setIsLoading) {
    await httpClient.get('/api/claims/').then(function(response) {
        setIsLoading(true);
        console.log(response.data);
        const maxNum = response.data.claims.length;
        if (maxNum !== 0) {
            response.data.claims.map((claim) => {
                const currentNum = AcceptedArr.length + PendingArr.length + RejectedArr.length + DraftsArr.length;
                if (maxNum <= currentNum) {
                    return;
                } else if (claim.status === "Approved") {
                    AcceptedArr.push(claim);
                } else if (claim.status === "Pending") {
                    PendingArr.push(claim);
                    console.log("pending msg");
                } else if (claim.status === "Denied") {
                    RejectedArr.push(claim);
                } else if (claim.status === "Draft") {
                    DraftsArr.push(claim);
                }
            });
        }
    }).catch(function(error) {
        console.log(error);
    }).finally(() => {
        setIsLoading(false)
        sortDraftsArray();
    });
};

var TempAcceptedArr = [];
var TempPendingArr = [];
var TempRejectedArr = [];


// var counter = 0;
export function emptyDraftsArr() {
    DraftsArr = [];
    console.log("Drafts array emptied.");
    return;
};
/**
 * 
 * @param {number} draftClaimId 
 * @param {{
 * title: string|null,
 * type: string|null,
 * currency: string|null,
 * amount: number|null,
 * date: string|null,
 * description: string|null,
 * image: string|null
 * }} details 
 */
export function addToDraftsArr(draftClaimId, details) {
    const { title, type, currency, amount, date, description, imagesArr } = details;
  
    const output = {
        id: draftClaimId,
        title: title,
        type: type,
        currency: currency,
        amount: amount,
        date: date,
        description: description,
        imagesArr: imagesArr,

        // but then the thing that code below actually uses (which weren't covered above)...
        date_time: date,
        currency_type: currency,
        desc: title,
        claim_id: draftClaimId
    };
    DraftsArr.push(output);
    DraftsArr_Local.push(Object.assign({}, output));
    console.log(`Drafts array updated, with: `, output);
    
    sortDraftsArray();

    return;
};
export function editDraft(draftClaimId, details) {
    const { title, type, currency, amount, date, description, imagesArr } = details;
    const present_info = DraftsArr.find((claim) => claim.id === draftClaimId);
    if (present_info === undefined) {
        console.error(`Draft with id ${draftClaimId} not found.`);
        return undefined;
    }
    present_info.title = title;
    present_info.type = type;
    present_info.currency = currency;
    present_info.amount = amount;
    present_info.date = date;
    present_info.description = description;
    present_info.imagesArr = imagesArr;
    present_info.date_time = date;
    present_info.currency_type = currency;
    present_info.desc = title;
    console.log(`Drafts array updated, with: `, present_info);
    return present_info;
};
export let _GLOB_FORCE_RELOAD = undefined;
export function removeFromDraftsArr(draftClaimId) {
    DraftsArr = DraftsArr.filter((claim) => claim.id !== draftClaimId);
    console.log(`Drafts array updated, with claim ${draftClaimId} removed.`);
    if (_GLOB_FORCE_RELOAD !== undefined) {
        _GLOB_FORCE_RELOAD();
    }
    return;
};

let interval_sortDraftsArr = undefined;
export function MyExpenses(){
    const [isLoading, setIsLoading] = useState(true);

    const clearClaimsArrays = () => {
        document.title = "Your Expenses";

        // forces the Arrays to empty on every render, 
        // so we end up with the correct amount of claims
        AcceptedArr = [];
        PendingArr = [];
        RejectedArr = [];
        DraftsArr = [];
        
        fetchClaims(setIsLoading);
    };
    _GLOB_FORCE_RELOAD = clearClaimsArrays;
    useEffect(clearClaimsArrays, []);

    //Example expense object, This is used to display
    // const [expense, setExpense] = useState({date_time:"2024/2/21 - 1:48PM",currency_type:"£",amount:151,desc:"Fortnite Card",state:"Accepted"})
    const [apply_filters, setApplyFilters] = useState(false);

    //To check the state of each type of expense
    const [isCollapsed, setIsCollapsed] = useState({
        drafts: true, 
        pending: true, 
        rejected: true, 
        accepted: true, 
        filter: false
    });

    //Animations
    const transition_drafts = useTransition(isCollapsed.drafts, {
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 500 },
    });
    const transition_pending = useTransition(isCollapsed.pending ,{
        from: {x:-2000,opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 500 },
    })
    const transition_rejected = useTransition(isCollapsed.rejected ,{
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 500 },
    })
    const transition_accepted = useTransition(isCollapsed.accepted ,{
        from: {x:-2000, opacty:0, height:0},
        enter: {x:0, opacity:1, height:76},
        leave: {x:2000 ,opacity:0, height:0},
        config: { duration: 500 },
    })
    const transition_filter = useTransition(isCollapsed.filter ,{
        from: {y:500, opacty:0},
        enter: {y:-500, opacity:1},
        leave: {y:500 ,opacity:0},
        config: { duration: 500 },
    })

    //This handles what will happen when the collapse button is pressed
    const handleCollapse = (column)=>{
        if (column === "drafts") {
            const swapCollapse = {...isCollapsed, drafts  :!(isCollapsed.drafts)};
            setIsCollapsed(swapCollapse);
        }
        else if(column === "pending"){
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
    };

    //This will remove the filters that were applied, does this by storing
    //the arrays pre-filter and then bringing them back when the filter is removed
    const handleRemoveFilters = ()=>{
        setApplyFilters(false);
        AcceptedArr = TempAcceptedArr;
        RejectedArr = TempRejectedArr;
        PendingArr = TempPendingArr;
        TempPendingArr = [];
        TempAcceptedArr = [];
        TempRejectedArr = [];
        console.log(AcceptedArr);
    };
    //This will apply filters to the expenses
    const handleApplyFilters = (month,amountF,currency) => {
        setApplyFilters(true);
        handleCollapse("filter");

        //Saving what the arrays were pre-filter
        if (TempAcceptedArr.length === 0 && TempAcceptedArr.length === 0 && TempRejectedArr.length === 0) {
            TempAcceptedArr = AcceptedArr
            TempRejectedArr = RejectedArr
            TempPendingArr = PendingArr
        }
        else{
            AcceptedArr = TempAcceptedArr
            RejectedArr = TempRejectedArr
            PendingArr = TempPendingArr
        }
        //Filtering based on amount
        if (amountF.Ten){
            AcceptedArr = filterAmountArray(AcceptedArr,10)
            RejectedArr = filterAmountArray(RejectedArr,10)
            PendingArr = filterAmountArray(PendingArr,10)
        }
        else if (amountF.Fifty){
            AcceptedArr = filterAmountArray(AcceptedArr,50)
            RejectedArr = filterAmountArray(RejectedArr,50)
            PendingArr = filterAmountArray(PendingArr,50)
        }
        else if (amountF.Hundred){
            AcceptedArr = filterAmountArray(AcceptedArr,100)
            RejectedArr = filterAmountArray(RejectedArr,100)
            PendingArr = filterAmountArray(PendingArr,100)
        }

        //Filtering based on currency
        if (currency.Pound) {
            AcceptedArr = filterCurrencyArray(AcceptedArr,"£")
            RejectedArr = filterCurrencyArray(RejectedArr,"£")
            PendingArr = filterCurrencyArray(PendingArr,"£")
        }
        else if (currency.Dollar) {
            AcceptedArr = filterCurrencyArray(AcceptedArr,"$")
            RejectedArr = filterCurrencyArray(RejectedArr,"$")
            PendingArr = filterCurrencyArray(PendingArr,"$")
        }
        else if (currency.Euro) {
            AcceptedArr = filterCurrencyArray(AcceptedArr,"€")
            RejectedArr = filterCurrencyArray(RejectedArr,"€")
            PendingArr = filterCurrencyArray(PendingArr,"€")
        }

        if (month.Month) {
            AcceptedArr = filterMonthArray(AcceptedArr,1)
            RejectedArr = filterMonthArray(RejectedArr,1)
            PendingArr = filterMonthArray(PendingArr,1)
        }
        else if (month.ThreeMonth) {
            AcceptedArr = filterMonthArray(AcceptedArr,3)
            RejectedArr = filterMonthArray(RejectedArr,3)
            PendingArr = filterMonthArray(PendingArr,3)
        }
        else if (month.SixMonth) {
            AcceptedArr = filterMonthArray(AcceptedArr,6)
            RejectedArr = filterMonthArray(RejectedArr,6)
            PendingArr = filterMonthArray(PendingArr,6)
        }
    };

    function filterAmountArray(arr,amount_to_filter_by) {
        const newArr = [];
        for(var i=0;i<arr.length;i++){
            if(arr[i].amount < amount_to_filter_by){
                newArr.push(arr[i])
            }
        }
        return newArr;
    };
    function filterCurrencyArray(arr,currency_to_filter_by) {
        const newArr = []
        for(var i=0;i<arr.length;i++){
            if(arr[i].currency === currency_to_filter_by){
                newArr.push(arr[i])
            }
        }
        return newArr;
    };

    function filterMonthArray(arr,month_to_filter_by){
        const newArr = [];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();
       
        for(var i=0;i<arr.length;i++){
            let expense_year = parseInt(arr[i].date.substr(12,4));
            let expense_month_num = months.indexOf(arr[i].date.substr(8,3));
            for(var j=0;j<(year-expense_year);j++){
                expense_month_num = expense_month_num-12;
            }
            if(Math.abs(expense_month_num-month) <= month_to_filter_by){
                newArr.push(arr[i]);
            }
        }
        return newArr;
    };

    

    // useEffect(()=>{
    //     sortDraftsArray();
    // }, [DraftsArr]);
    if (interval_sortDraftsArr === undefined) {
        interval_sortDraftsArr = setInterval(()=>{
            sortDraftsArray();
        }, 3000);
    }

    
    return(
    <div>
        <NavBar/>
        <Animate_page>
            <div className='view-expenses'>
                <div className='ViewExpensesPage'>
                    <div id='PhoneBox'>
                        <div id='TitleBox'>
                            <div id='Title'>My Expenses</div>
                            { apply_filters ? <button className='Filters-Applied-Text' onClick={handleRemoveFilters}>Filters Applied  X</button> : "" }
                            <button className='Filter-Icon' onClick={() => handleCollapse("filter")}>
                                <FilterIcon />
                            </button>
                        </div>

                        <div className='expense-column'>
                            <div className="h2-collapse" onClick={() => handleCollapse('drafts')}>
                                <h2 className="ExpenseType">Draft Claims</h2>

                                {isCollapsed.drafts ? (
                                    <ArrowDownIcon />
                                ) : (
                                    <ArrowUpIcon />
                                )}
                            </div>
                            {
                                (!isNullish(DraftsArr) && DraftsArr.length > 0) ? (
                                    removeDuplicatesFromArray(DraftsArr).map((expense, index) =>
                                        (transition_drafts((style, item) =>
                                        item ? <animated.div style={style}>
                                            <Link to="/view-expense" state={{id: expense.claim_id, draftClaim: (()=>{
                                                const local_draft = DraftsArr_Local.find((draftLocal) => draftLocal.id === expense.claim_id);
                                                let output_expense = Object.assign({}, local_draft, expense);
                                                console.log(`DraftsArr_Local: `, DraftsArr_Local);
                                                console.log(`output_expense: `, output_expense);
                                                return output_expense;
                                            })() }}>
                                                <ExpenseBox key={index} expense={expense} />
                                            </Link>
                                        </animated.div>
                                        : '')
                                    ))
                                ) : (<p style={{padding:"1rem"}}>Nothing Here right now...</p>)
                            }

                            <div className='h2-collapse' onClick={() => handleCollapse('pending')}>
                                <h2 className='ExpenseType'>Pending</h2>

                                {isCollapsed.pending ? (
                                    <ArrowDownIcon />
                                ) : (
                                    <ArrowUpIcon />
                                )}
                            </div>
                            {
                                PendingArr.map((expense, index) =>
                                    (transition_pending((style, item) =>
                                    item ? <animated.div style={style}>
                                        <Link to="/view-expense" state={{ claim: expense }}>
                                            <ExpenseBox key={index} expense={expense}/>
                                        </Link>
                                    </animated.div>
                                    : '')
                                ))
                            }

                            <div className='h2-collapse' onClick={() => handleCollapse('rejected')}>
                                <h2 className='ExpenseType'>Rejected</h2>

                                {isCollapsed.rejected ? (
                                    <ArrowDownIcon />
                                ) : (
                                    <ArrowUpIcon />
                                )}
                            </div>
                            {
                                RejectedArr.map((expense, index) =>
                                    (transition_rejected((style, item) =>
                                    item ? <animated.div style={style}>
                                        <Link to="/view-expense" state={{ claim: expense }}>
                                            <ExpenseBox key={index} expense={expense}/>
                                        </Link>
                                    </animated.div>
                                    : '')
                                ))
                            }

                            <div className='h2-collapse' onClick={() => handleCollapse('accepted')}>
                                <h2 className='ExpenseType'>Accepted</h2>

                                {isCollapsed.accepted ? (
                                    <ArrowDownIcon />
                                ) : (
                                    <ArrowUpIcon />
                                )}
                            </div>
                            {
                                AcceptedArr.map((expense, index) =>
                                    (transition_accepted((style, item) =>
                                    item ? <animated.div style={style}>
                                            <Link to="/view-expense" state={{ claim: expense }}>
                                                <ExpenseBox key={index} expense={expense}/>
                                            </Link>
                                        </animated.div>
                                    : '')
                                ))
                            }
                            <div className='pseudoMargin'></div>
                        </div>
                    </div>
                </div>
            </div>
            {
                transition_filter((style, item) =>
                    item ? <animated.div style={style}><FilterBox handleCollapse={handleCollapse} handleApplyFilters={handleApplyFilters}/></animated.div>
                    : '')
            }
        </Animate_page>
    </div>);
}
export default MyExpenses;

function isNullish(value) {
    return value === null || value === undefined || value === "0.00";
};

const ExpenseBox = (props) =>{
    // console.log(`ExpenseBox, props.expense: `, props.expense);
    var img

    if (props.expense.status === "Pending"){
        img = <PendingIcon />
    }
    else if(props.expense.status === "Denied"){
        img = <RejectedIcon />
    }
    else if(props.expense.status === "Approved"){
        img = <AcceptedIcon />
    }
    else if(props.expense.status === "Draft"){
        img = <DraftIcon />
    }

    return(
        <div className='claim-box'>
            <div className='Status-Img'>{img}</div>

            <div className='claim-info'>
                <div className='title'>{ isNullish(props.expense.title) ? ("Title Unknown (impossible... how?)") : (props.expense.title) }</div>
                <div>{isNullish(props.expense.currency) ? ("No Currency") : props.expense.currency} {isNullish(props.expense.amount) ? "No Amount" : props.expense.amount}</div>
                <div className='claim-date'>{ isNullish(props.expense.date) ? ("No Date") : (props.expense.date.replace(" 00:00:00 GMT", "")) }</div>
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
                <h3>Time</h3>  
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


/*
    MODEL REPLY FOR API CALL

    {
    "claims": [
        {
            "amount": "420.69",
            "claim_id": 22,
            "currency": "£",
            "date": "Mon, 01 Apr 2024 00:00:00 GMT",
            "description": "Please reinburse me this has made me broke",
            "expenseType": "Catering",
            "receipts": [],
            "status": "Pending",
            "title": "Gucci flip-flops",
            "user_id": 35
        },
        {
            "amount": "21.59",
            "claim_id": 20,
            "currency": "£",
            "date": "Tue, 12 Mar 2024 00:00:00 GMT",
            "description": "example description",
            "expenseType": "Catering",
            "receipts": [],
            "status": "Approved",
            "title": "example title",
            "user_id": 35
        },
        {
            "amount": "19.99",
            "claim_id": 21,
            "currency": "£",
            "date": "Sat, 30 Mar 2024 00:00:00 GMT",
            "description": "I need this for my mental health.",
            "expenseType": "Travel",
            "receipts": [],
            "status": "Approved",
            "title": "Fortnite card",
            "user_id": 35
        },
        {
            "amount": "-1.00",
            "claim_id": 24,
            "currency": "ABCD",
            "date": "Tue, 02 Apr 2024 00:00:00 GMT",
            "description": "Unknown",
            "expenseType": "Unknown",
            "receipts": [],
            "status": "Draft",
            "title": "Hello World! AWOOOGA!",
            "user_id": 35
        }
    ],
    "user_id": 35
}
*/
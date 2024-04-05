import '../css/ReviewExpense.css';
import { BackButtonIcon, PendingIcon, RejectedIcon, AcceptedIcon } from "../assets/Icons";
import React, { useEffect } from 'react';
import NavBar from "./NavBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";

export function ReviewExpense() {
    let { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Review Expense";
    }, [])

    async function denyClaim() {
        if ( confirm("Are you sure you want to deny this claim?") ) {
            await httpClient.patch(`/api/claims/${state.claim.claim_id}/review`, { status: "denied" })
            .then(function (response) {
                console.log(response);
                // alert the user of the response, then navigate
                alert(`${response.data.message} \nNew Status: Denied`);
                navigate("/line-manager-expenses")
            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data.error);
            })
        }
    }

    async function approveClaim() {
        if ( confirm("Are you sure you want to approve this claim?") ) {
            await httpClient.patch(`/api/claims/${state.claim.claim_id}/review`, { status: "approved" })
            .then(function (response) {
                console.log(response);
                // alert the user of the response, then navigate
                alert(`${response.data.message} \nNew Status: Approved`);
                navigate("/line-manager-expenses")
            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data.error);
            })
        }
    }

    return(
        <div>
            <NavBar />
            <div id="ExpenseBody">
                <div id="TitleBar">
                    <NavLink to={"/line-manager-expenses"}><BackButtonIcon/></NavLink>
                    <h1>Review Expense</h1>
                </div>
                <hr/>
                <div id="Status">
                    {
                        state.claim.status === "Pending" ? <PendingIcon/> : (
                            state.claim.status === "Approved" ? <AcceptedIcon/> : (
                                state.claim.status === "Denied" && <RejectedIcon/>
                            )
                        )
                    }
                    <h2>Status</h2>
                    <p>{state.claim.status}</p>
                </div>
                <div id="ExpenseDetails">
                    <h2>Expense</h2>
                    <p>{state.claim.title}</p>

                    <h2>Date</h2>
                    <p>{state.claim.date.replace(" 00:00:00 GMT", "")}</p>

                    <h2>Amount</h2>
                    <p>{state.claim.currency+state.claim.amount} <i className="AI">AI detected amount to be {state.claim.currency+state.claim.amount}.</i></p>

                    <h2>Type</h2>
                    <p>{state.claim.expenseType}</p>

                    <h2>Description</h2>
                    <p>{state.claim.description}</p>

                    <h2>Evidence</h2>
                    { /* UNTESTED!!!!!! */
                        state.claim.receipts.length > 0 ? (
                            state.claim.receipts.map((evidence) => {
                                <a href={evidence} target='_blank'>Attached Evidence</a>
                            })
                        ) : (
                            <p>No evidence attached to this claim.</p>
                        )
                    }
                </div>

                {
                    state.claim.status === "Pending" && (
                        <div id='JudgmentContainer'>
                                <div id="DenyClaim" onClick={() => {denyClaim()}}>
                                    <p>Deny this claim</p>
                                </div>
                                <div id="ApproveClaim" onClick={() => {approveClaim()}}>
                                    <p>Approve this claim</p>
                                </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
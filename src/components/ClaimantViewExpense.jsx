import { useState, useEffect } from "react";
import "../css/ClaimantViewExpense.css"
import NavBar from "./NavBar";
import { BackButtonIcon, PendingIcon, RejectedIcon, AcceptedIcon } from "../assets/Icons"
import { NavLink, useLocation } from "react-router-dom";
import httpClient from "../httpClient";
import Animate_page from "./Animate-page";

export function ClaimantViewExpense() {
    let { state } = useLocation();
    console.log(state);
    const [claim, setClaim] = useState();

    useEffect(() => {
        document.title = "View Expense";
        setClaim(state.claim);
    }, [])

    async function appealClaim() {
        await httpClient.post(`/api/claims/${state.claim.claim_id}/appeal`,
            {
                description: claim.description
            }
        )
        .then(function(response) {
            alert(response.data.message);
        })
        .catch(function(error) {
            console.log(error);
            alert(error.response.data.error);
        })
    }

    return (
        <div>
            <NavBar/> 
            <Animate_page>
            <div id="ExpenseBody">
                <div id="TitleBar">
                    <NavLink to={"/my-expenses"}><BackButtonIcon/></NavLink>
                    <h1>View Expense</h1>
                </div>
                <hr/>
                <div id="Status">
                    {
                        claim && (
                            claim.status === "Pending" ? <PendingIcon/> : (
                                claim.status === "Approved" ? <AcceptedIcon/> : (
                                    claim.status === "Denied" && <RejectedIcon/>
                                )
                            )
                        )
                    }
                    <h2>Status</h2>
                    <p>{claim?.status}</p>
                </div>
                <div id="ExpenseDetails">
                    <h2>Expense</h2>
                    <p>{claim?.title}</p>

                    <h2>Date</h2>
                    <p>{claim?.date.replace(" 00:00:00 GMT", "")}</p>

                    <h2>Amount</h2>
                    <p>{claim?.currency+claim?.amount} <i className="AI">AI detected amount to be {claim?.currency+claim?.amount}.</i></p>

                    <h2>Type</h2>
                    <p>{claim?.expenseType}</p>

                    <h2>Description</h2>
                    <p>{claim?.description}</p>

                    <h2>Evidence</h2>
                    { /* UNTESTED!!!!!! */
                        claim && (
                            claim.receipts.length > 0 ? (
                                claim.receipts.map((evidence) => {
                                    <a href={evidence}  target='_blank'>Attached Evidence</a>
                                })
                            ) : (
                                <p>No evidence attached to this claim.</p>
                            )
                        )
                    }
                </div>

                { /* Tested, fully functional. */
                    claim?.status === "Denied" && (
                        <NavLink to={"/my-expenses"} onClick={() => {appealClaim()}}>
                            <div id="AppealClaim">
                                <p>Appeal this claim</p>
                            </div>
                        </NavLink>
                    )
                }
            </div>
            </Animate_page>
        </div>
    )
}

/* 
    Model output from { state }:
    {
        "id": 22
    }

    Model reply from the server:
    {
        "data": {
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
        "status": 200,
        "statusText": "OK",
        "headers": {
            "access-control-allow-credentials": "true",
            "access-control-allow-origin": "http://127.0.0.1:5173",
            "connection": "close",
            "content-length": "291",
            "content-type": "application/json",
            "date": "Wed, 03 Apr 2024 14:17:00 GMT",
            "server": "Werkzeug/3.0.1 Python/3.12.2",
            "vary": "Origin, Cookie"
        },
        "config": {
            "transitional": {
                "silentJSONParsing": true,
                "forcedJSONParsing": true,
                "clarifyTimeoutError": false
            },
            "adapter": [
                "xhr",
                "http"
            ],
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {},
            "headers": {
                "Accept": "application/json, text/plain, *"
            },
            "withCredentials": true,
            "method": "get",
            "url": "/api/claims/22"
        },
        "request": {}
    }
*/
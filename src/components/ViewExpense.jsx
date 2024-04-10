import { useState, useEffect } from "react";
import "../css/ViewExpense.css"
import NavBar from "./NavBar";
import { BackButtonIcon, PendingIcon, RejectedIcon, AcceptedIcon, DraftIcon } from "../assets/Icons"
import { Link, useLocation, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";
import Animate_page from "./Animate-page";
import { removeFromDraftsArr } from "./MyExpenses.jsx";
import { ensureLS_recentViewedExpense_exists, ensureLS_saveDraftClaim_exists, ls_keys } from "./utils";
import Modal from "./Modal.jsx";


export function ViewExpense() {
    const navigate = useNavigate();
    let { state } = useLocation();
    console.log(state);
    const [claim, setClaim] = useState();
    const [appealClick,setAppealClick] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleAppealClick = () => {
        setAppealClick(true)
    }

    // const ls_recentViewedExpense = ensureLS_recentViewedExpense_exists();
    // console.log(`ls_recentViewedExpense: `, ls_recentViewedExpense);
    // if (ls_recentViewedExpense["most-recent-id"] !== -1) {
    //     console.info(`ViewExpense : This expense was the most recently viewed expense.`);
    //     state = ls_recentViewedExpense["state"];
    // } else {
    //     console.info(`ViewExpense : This expense was not the most recently viewed expense.`);
    // }

    useEffect(() => {
        document.title = "View Expense";
        setClaim(state.claim);
        if (state.draftClaim !== undefined) {
            console.info(`Draft claim found: ${state.draftClaim}`);
            setClaim(state.draftClaim);
        } else {
            console.info("No draft claim found.");
        }
    }, []);

    async function appealClaim() {
        await httpClient.post(`/api/claims/${state.claim.claim_id}/appeal`,
            {
                description: claim.description
            }
        ).then(function(response) {
            alert(response.data.message);
        }).catch(function(error) {
            console.log(error);
            alert(error.response.data.error);
        });
    };

    
    async function deleteDraft() {
        const ls_draftStorage = ensureLS_saveDraftClaim_exists();
        const draftClaim = state.draftClaim;
        if (!draftClaim) {
            window.alert("No draft claim found.");
            console.error(`No draft claim found.`);
        } else {
            console.log(`delete draft : Deleting draft-claim: `, draftClaim);
            const draftClaimId = draftClaim.claim_id;
            if (draftClaimId === undefined || draftClaimId === null) {
                window.alert("Draft claim id is nullish.");
                console.error(`Draft claim id is nullish.`);
                return;
            }
            console.log(`delete draft : Draft-claim id: ${draftClaimId}`);
            const reqClaims = new Request(`/api/claims/drafts/${draftClaimId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            // console.info({reqClaims});
            /**
             * @type {Response}
             */
            const response = await fetch(reqClaims);
            try {
                if (response.status === 200) {
                    const json = await response.json();
                    console.info(`delete draft : response: `, json);
                    // server is returning {"id": number, "message": string}
                    // so we unpack that
                    const {id, message} = json;
                    if (id !== undefined && id !== null) {
                        ls_draftStorage["most-recent-draft"] = null;
                        ls_draftStorage["most-recent-timestamp"] = Date.now();
                        /**
                         * @type {number[]}
                         */
                        const arr = ls_draftStorage["draft_ids"];
                        const index_for_id = arr.findIndex((val)=>{
                            return val === id;
                        });
                        if (index_for_id !== -1) {
                            arr.splice(index_for_id, 1);
                        }
                        window.localStorage.setItem(ls_keys["save-draft-claim"], JSON.stringify(ls_draftStorage));
                        console.log(`delete draft : Draft-claim deleted, id was: ${id}.`);
                        // window.alert(`This draft-claim has been deleted.`);
                        navigate('/my-expenses')
        
                        removeFromDraftsArr(id);
                    } else {
                        console.error(`delete draft : Failed to delete draft-claim. Id was nullish.`);
                    }
                } else {
                    console.error(`delete draft : Failed to delete draft-claim. Status: ${response.status}`);
                }
            } catch (e) {
                console.error(e);
            }

            return;
        }
        return;
    }

    return (
        <div>
            <NavBar/> 
            <Animate_page>
            <div className='view-expense'>
                <div id="ExpenseBody">
                    <div id="TitleBar">
                        <Link to={"/my-expenses"}><BackButtonIcon/></Link>
                        <div className="page-title">View Expense</div>
                    </div>
                    <hr/>
                    <div id="Status">
                        {
                            claim && (
                                claim.status === null || claim.status === undefined? "No Status":
                                claim.status === "Pending" ? <PendingIcon/> : (
                                    claim.status === "Approved" ? <AcceptedIcon/> : (
                                        claim.status === "Denied" ? <RejectedIcon/> : (
                                            claim.status === "Draft" && <DraftIcon/>
                                        )
                                    )
                                )
                            )
                        }
                        <h2>Status</h2>
                        <p>{isNOTNullish(claim?.status)? claim?.status : 'No Expense Status'}</p>
                    </div>
                    <div id="ExpenseDetails">
                        <h2>Expense</h2>
                        <p>{claim?.title}</p>

                        <h2>Date</h2>
                        <p>{isNOTNullish(claim?.date)? claim?.date.replace(" 00:00:00 GMT", "") : 'No Date'}</p>

                        <h2>Amount</h2> {console.log("Amount is: " + claim?.amount)}
                        <p>{amountHandler(claim?.currency, claim?.amount)} <i className="AI">AI detected amount to be {amountHandler(claim?.currency, claim?.amount)}.</i></p>

                        <h2>Type</h2>
                        <p>{isNOTNullish(claim?.expenseType)? claim?.expenseType : 'No Expense Type'}</p>

                        <h2>Description</h2>
                        <p>{isNOTNullish(claim?.description)? claim?.description : 'No Description'}</p>

                        <h2>Evidence</h2>
                        {
                            (isNOTNullish(claim) && claim.receipts.length > 0) ? (
                                claim.receipts.map((evidence, index) => {
                                    const imageUrl = evidence.imageContentsBase64;

                                    /*
                                        Acknowledgements:

                                        https://stackoverflow.com/a/73502589
                                    */
                                    function openUp() {
                                        let image = new Image();
                                        image.src = imageUrl;
                                        var newTab = window.open();
                                        newTab.document.body.innerHTML = image.outerHTML;
                                    }
                                    
                                    
                                    return (
                                    <div key={index}>
                                        <a href='' onClick={(evt)=>{
                                            evt.preventDefault(); // Prevent the default behavior of the anchor tag
                                            // const ls_recentViewedExpense = ensureLS_recentViewedExpense_exists();
                                            // ls_recentViewedExpense["most-recent-id"] = claim.claim_id;
                                            // ls_recentViewedExpense["most-recent-timestamp"] = Date.now();
                                            // if (!ls_recentViewedExpense["expense_ids"].includes(claim.claim_id)) {
                                            //     ls_recentViewedExpense["expense_ids"].push(claim.claim_id);
                                            // }
                                            // ls_recentViewedExpense["state"] = state;
                                            // window.localStorage.setItem(ls_keys["view-expense-recent"], JSON.stringify(ls_recentViewedExpense));
                                            openUp();
                                        }}>Attached evidence</a> <br />
                                    </div>
                                    )
                                })
                            ) : (
                                <p>No evidence attached to this claim.</p>
                            )
                        }
                    </div>

                    {
                        isNOTNullish(claim?.status)? claim?.status === "Draft" && (
                            <div id="DraftDiv">
                                <Link to={"/create-claim"} state={{draftClaim: state.draftClaim}} className="edit-link">
                                    <div id="DraftEdit">
                                        <p>Edit Draft</p>
                                    </div>
                                </Link>

                                <div id="DraftDelete" onClick={() => setShowDeleteModal(true)}>
                                    <p>Delete Draft</p>
                                </div>

                                <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                                    <div className="draft-delete-modal">
                                        <div>Are you sure you want to delete this draft?</div>

                                        <div className="options">
                                            <div className="cancel" onClick={() => setShowDeleteModal(false)}>
                                                Cancel
                                            </div>

                                            <div className="delete" onClick={() => {deleteDraft()}}>
                                                Delete
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        )
                        :''
                    }

                    { /* Tested, fully functional. */
                        isNOTNullish(claim?.status)? claim?.status === "Denied" && (
                            appealClick?
                        <div>
                        <legend className='createLegend'>Reason For Appeal</legend>
                        <form className='createForm'>
                        <div>
                            {/* <label>Description</label> */}
                            <textarea
                                name="description"
                                className='infield descriptionInput'
                                placeholder='Explanation...'
                                required
                            />
                        </div>
                         </form>

                            <Link to={"/my-expenses"} onClick={() => {appealClaim()}}>
                                <div id="AppealClaim">
                                    <p>Appeal Claim</p>
                                </div>
                            </Link>
                            </div>
                            :
                            <div>
                            <div id="AppealClaim" onClick={() =>handleAppealClick()}>
                            <p>Appeal Claim</p></div> </div>
                        )
                        : ''
                    }
                </div>
            </div>
            </Animate_page>
        </div>
    )
}

function isNOTNullish(value) {
    return value != null || value != undefined;
};

function amountHandler(currency, amount) {
    var retString = ""
    if (isNOTNullish(currency)) {
        retString = retString + currency;
    }
    if (isNOTNullish(amount)) {
        retString = retString + amount;
    }
    return retString;
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
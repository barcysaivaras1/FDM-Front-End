export const ls_keys = {
    "create-claim": "fdm-expenses-client/create-claim/form-data",
    "save-draft-claim": "fdm-expenses-client/draft-claim",
    "view-expense-recent": "fdm-expenses-client/view-expense/recent"
};

/**
 * # ensureLS_createClaim_exists
 * 
 * Ensures that the localStorage object for the create-claim form exists.
 * 
 * @returns {{
 * "most-recent-draft": number,
 * "most-recent-timestamp": number,
 * "draft_ids": Array<number>
 * }} - Returns the localStorage object for draft-saving.
 */
export function ensureLS_saveDraftClaim_exists() {
    let ls_draftStorage = window.localStorage.getItem(ls_keys["save-draft-claim"]);
    if (ls_draftStorage === null) {
        ls_draftStorage = {
            "most-recent-draft": -1,
            "most-recent-timestamp": 0,
            "draft_ids": []
        };
        window.localStorage.setItem(ls_keys["save-draft-claim"], JSON.stringify(ls_draftStorage));
        ls_draftStorage = window.localStorage.getItem(ls_keys["save-draft-claim"]);
    }
    return JSON.parse(ls_draftStorage);
};

/**
 * 
 * @returns {{
 * "most-recent-id": number,
 * "most-recent-timestamp": number,
 * "expense_ids": Array<number>,
 * "state": object
 * }} - Returns the localStorage object for the most recently viewed expense.
 */
export function ensureLS_recentViewedExpense_exists() {
    let ls_recentViewedExpense = window.localStorage.getItem(ls_keys["view-expense-recent"]);
    if (ls_recentViewedExpense === null) {
        ls_recentViewedExpense = {
            "most-recent-id": -1,
            "most-recent-timestamp": 0,
            "expense_ids": [],
            "state": {}
        };
        window.localStorage.setItem(ls_keys["view-expense-recent"], JSON.stringify(ls_recentViewedExpense));
        ls_recentViewedExpense = window.localStorage.getItem(ls_keys["view-expense-recent"]);
    }
    return JSON.parse(ls_recentViewedExpense);
};


// "End of File";
export const ls_keys = {
    "create-claim": "fdm-expenses-client/create-claim/form-data",
    "save-draft-claim": "fdm-expenses-client/draft-claim"
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


// "End of File";
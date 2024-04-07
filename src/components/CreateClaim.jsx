import { useState, useEffect } from 'react'
import NavBar from "./NavBar";
import '../css/CreateClaim.css';
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import Animate_page from './Animate-page';
import { ls_keys } from './utils';
import { ensureLS_saveDraftClaim_exists } from './utils';
import { addToDraftsArr } from './ClaimantExpenses';
import { Link, useLocation } from 'react-router-dom';

const ls_key = "fdm-expenses-client/create-claim/form-data";





/**
 * 
 * @param {{
 * claim_id: number|null,
 * title: string|null,
 * type: string|null,
 * currency: string|null,
 * amount: number|null,
 * date: string|null,
 * description: string|null,
 * image: string|null
 * }} details 
 */
async function saveAsDraft(details) {
    const ls_draftStorage = ensureLS_saveDraftClaim_exists();
    const { title, type, currency, amount, date, description, image } = details;

    const thingsToCheckNull = [title, type, currency, amount, date, description];
    if (thingsToCheckNull.every((v)=> v === null)) {
        console.log(`saveAsDraft : Nothing to save, all fields are null.`);
        return;
    }
    
    const image_contents_base64 = "something";
    const output_to_server = {
        title, type, currency, amount, date, description, image: image_contents_base64
    };
    const reqClaims = new Request("/api/claims/drafts", {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(output_to_server),
    });
    // console.info({reqClaims});
    /**
     * @type {Response}
     */
    const response = await fetch(reqClaims);
    try {
        if (response.status === 200) {
            const json = await response.json();
            console.info(`saveAsDraft : response: `, json);
            // server is returning {"id": number, "message": string}
            // so we unpack that
            const {id, message} = json;
            if (id !== undefined && id !== null) {
                ls_draftStorage["most-recent-draft"] = id;
                ls_draftStorage["most-recent-timestamp"] = Date.now();
                ls_draftStorage["draft_ids"].push(id);
                window.localStorage.setItem(ls_keys["save-draft-claim"], JSON.stringify(ls_draftStorage));
                console.log(`saveAsDraft : Draft-claim created with id: ${id}.`);
                window.alert(`This has been saved as a draft, and the form has been cleared.\nTo open the draft, go to the \"My Expenses\" section.`);

                addToDraftsArr(id, details);
            } else {
                console.error(`saveAsDraft : Failed to create draft-claim. Id was nullish.`);
            }
        } else {
            console.error(`saveAsDraft : Failed to do/view claim. Status: ${response.status}`);
        }
    } catch (e) {
        console.error(e);
    }

    console.info(`Save as Draft: `, {details});
    return;
};


export function CreateClaim () {
    let alreadyLoadedDraft = false;
    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    let { state } = useLocation();
    useEffect(()=>{
        console.log(state);
        if (state !== null && !alreadyLoadedDraft && state["draftClaim"] !== undefined) {
            console.log(`Draft claim found in state: `, state["draftClaim"]);
            alreadyLoadedDraft = true;
            const { amount, claim_id, currency, date, description, expenseType, receipts, status, title, user_id } = state["draftClaim"];
            setTitle(title);
            setType(expenseType);
            setCurrency(currency);
            setAmount(amount);
            setDate(date);
            setDescription(description);
            // setImage(receipts);
            // setPreview(receipts);
            console.log(`Loaded draft: `, state["draftClaim"]);
            console.log(title, description, expenseType);
            // window.location.reload();
        } else {
            console.log(`No draft claim found in state.`);
            console.log(`state is: `, state);
            console.log(`alreadyLoadedDraft is: `, alreadyLoadedDraft);
        }
    }, [state, alreadyLoadedDraft, setTitle, setType, setCurrency, setAmount, setDate, setDescription]);

    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(image);

        await httpClient.post('/api/claims/', {
            title: title,
            amount: amount,
            currency: currency,
            type: type,
            date: date,
            description: description,
            image: image
        }).then(function(response) {
            console.log("Success" + response);
            navigate("/my-expenses");
        }).catch(function(error) {
            console.error("Failed to do/view claim. Status: " + error.response.status);
        });
        // void return.
        return;
    };

    /**
     * Check if a value is null or undefined
     * @param {any} thing - The value to check
     * @returns {boolean} - True if the value is null or undefined, false otherwise
     */
    function isNullish(thing) {
        return thing === null || thing === undefined;
    };

    // useEffect(()=>{
    //     const data = localStorage.getItem(ls_key);
    //     if (data) {
    //         const parsed = JSON.parse(data);
    //         setTitle(parsed.title);
    //         setType(parsed.type);
    //         setCurrency(parsed.currency);
    //         setAmount(parsed.amount);
    //         setDate(parsed.date);
    //         setDescription(parsed.description);

    //         // create new image from imageData in "image"
    //         const image = new Image();
    //         image.src = parsed.image;
    //         const blob = new Blob([parsed.image], {type: "image/png"});
    //         const file = new File([blob], "some-image.png", {type: "image/png"});
    //         setImage(file);

    //         // const imgElement = document.createElement("img");
    //         // imgElement.src = parsed.image;
    //         // console.log(imgElement);
    //         // const legend = document.querySelector("legend");
    //         // console.log(legend, imgElement);
    //         // legend?.appendChild(imgElement);
    //         // imgElement.onload = ()=>{
    //         // };
    //         // imgElement.style.display = "block";
    //         console.log(file, blob);
    //         setPreview(URL.createObjectURL(file));

    //         localStorage.removeItem(ls_key);
    //     }
    // }, []);
    // useEffect(()=>{
    //     const thingsToCheck = [title, type, currency, amount, date, description, image];
    //     const handleBeforeUnload = (evt)=>{
    //         const somethingIsBlank = thingsToCheck.some(isNullish);
    //         console.log(`Checking for nullish values: ${thingsToCheck.map((v)=>{console.log(v);return isNullish(v);})}`);
    //         if (!somethingIsBlank) {
    //             // nothing is left blank, no need to hold them here.
    //             evt.returnValue = false;
    //         }

    //         if (!image) {
    //             // no image is selected, no need to hold it here.
    //             evt.returnValue = false;
    //             return;
    //         }

    //         /**
    //          * @type {File}
    //          */
    //         const _img = image;
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const imgBase64Data = reader.result;
    //             // Use the base64Data as needed
                
    //             const data_to_save = {
    //                 title, type, currency, amount, date, description, image: imgBase64Data
    //             };
    //             console.log(data_to_save);
    //             localStorage.setItem(ls_key, JSON.stringify(data_to_save));
    //         };
    //         reader.readAsDataURL(_img);

    //         evt.returnValue = true;
    //     };
    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     return ()=>{
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };

    // }, [title, type, currency, amount, date, description, image]);

    useEffect(() => {
        document.title = "Create New Claim";
    }, [])

    return(
        <div>
            <NavBar />
            <Animate_page>
            <div className='createContainer'>
                <legend className='createLegend'>Create Claim</legend>
                <form className='createForm' onSubmit={handleSubmit}>
                    <input type="text" 
                        className='infield titleInput' 
                        name='title'
                        placeholder='Title...' 
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value)}}
                        required
                    />
                    <select name="expenseType" 
                        className='infield typeInput' 
                        value={type} 
                        onChange={(e) => {setType(e.target.value)}}
                        required
                    >
                        <option value="" disabled selected hidden>Type of Expense</option>
                        <option value="Travel">Travel Expense</option>
                        <option value="Accomomdation">Accomodation Expense</option>
                        <option value="Catering">Catering Expense</option>
                    </select>
                    <div className='inlineContainer'>
                        <select name="currencyType" 
                            className='infield currencyInput' 
                            value={currency} 
                            onChange={(e) => {setCurrency(e.target.value)}}
                            required
                        >
                            <option value="" disabled selected hidden>Currency</option>
                            <option value="£">£</option>
                            <option value="$">$</option>
                            <option value="€">€</option>
                        </select>
                        <input type="number" 
                            className='infield amountInput' 
                            name='amount'
                            placeholder='Amount' 
                            value={amount} 
                            onChange={(e) => {setAmount(e.target.value)}}
                            step="0.01" 
                            required
                        />
                    </div>
                    <input type="text"
                        onFocus={(e) => {e.target.type = "date"}}
                        className='infield dateInput'
                        name="date"
                        placeholder='Date of expense'
                        value={date}
                        onChange={(e) => {setDate(e.target.value)}}
                        required
                    />
                    <textarea name="description" 
                        className='infield descriptionInput' 
                        placeholder='Description' 
                        value={description} 
                        onChange={(e) => {setDescription(e.target.value)}}
                        required
                    ></textarea>
                    <div className="proofArea">
                        {image ? (
                            <>
                                <img src={preview} alt="uploaded proof" className='proofPreview'/>
                                <button className='cancelButton'
                                    onClick={() => {
                                        setImage(null)
                                        setPreview()
                                }}>
                                    Remove
                                </button>
                            </>
                        ) : (
                            <>
                                <CiImageOn />
                                <input className='imageInput' 
                                    id='file' 
                                    name='file' 
                                    type='file' 
                                    accept='image/*'
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                        setPreview(URL.createObjectURL(e.target.files[0]))
                                    }}
                                    required
                                />
                                <label htmlFor="file" className='almostButton'>Upload an Image</label>
                            </>
                        )}
                    </div>
                    {/* <button 
                        className='infield clearSubmit'
                        onClick={() => {
                            setTitle("");
                            setType("");
                            setCurrency("");
                            setAmount("");
                            setDate("");
                            setDescription("");
                            setImage(null);
                            setPreview(null);
                        }}
                    >
                        Clear form
                    </button>
                    <button className='infield createSubmit'>Submit Claim</button> */}

                    <b className="infield clearSubmit saveDraftSubmit" onClick={()=>{
                        saveAsDraft({title, type, currency, amount, date, description, image});
                    }}>Save as Draft</b>
                    <Link className='infield clearSubmit' to="/create-claim" state={{
                        draftClaim: {
                            amount: null, 
                            claim_id: null, 
                            currency: null, 
                            date: null, 
                            description: null, 
                            expenseType: null, 
                            receipts: null, 
                            status: null, 
                            title: null, 
                            user_id: null
                        }
                    }} >
                        <b className='infield clearSubmit' 
                            // className='infield clearSubmit'
                            onClick={() => {
                                setTitle("");
                                setType("");
                                setCurrency("");
                                setAmount("");
                                setDate("");
                                setDescription("");
                                setImage(null);
                                setPreview(null);
                                alreadyLoadedDraft = true;
                            }}
                        >
                            Clear form
                        </b>
                    </Link>
                    <button className='infield createSubmit'>Submit Claim</button>


                </form>
            </div>
            </Animate_page>
        </div>
    )
}

export default CreateClaim;
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
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToBase64(blob) {
	return new Promise((resolve, reject)=>{
		const reader = new FileReader();
		reader.onloadend = ()=> resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};

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
    const [recentImage, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [imagesArr, setImagesArr] = useState([]);
    function addAnImage(imageThing) {
        var buffer = Array.from(imagesArr);
        buffer.push(imageThing);
        setImagesArr(buffer);
        console.info(`[ADD AN IMAGE] I pushed ${imageThing}.`);
        return;
    };
    function removeAnImage(imageThing) {
        var buffer = Array.from(imagesArr);
        const index = buffer.findIndex((item)=>{
            return item === imageThing;
        });
        if (index !== -1) {
            buffer.splice(index, 1);
            setImagesArr(buffer);
            console.info(`[REMOVE IMAGE] I removed ${imageThing}.`);
        };
        return;
    };
    useEffect(()=>{
        // Appends new elements to the end of an array, and returns the new length of the array.
        // @param items — New elements to add to the array.
        // addAnImage((imagesArr) => {
        //     imagesArr.push(recentImage);
        //     console.log(`Our images are: ${imagesArr}`);
        //     return imagesArr;
        // });
        console.log(`Recent image is ${recentImage}`);
        console.log(`Images Arr: `, imagesArr);
    }, [recentImage, imagesArr]);

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
        console.log(`Reminder: images array : `, imagesArr);
        /**
         * Acknowledgements: 
         * - https://stackoverflow.com/questions/62677113/sending-an-image-uploaded-in-a-form-to-a-server-using-formdata-and-fetchapi-in-j
         * - https://stackoverflow.com/questions/66584058/how-do-i-post-an-array-of-images-using-formdata-reactjs
         * - https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
         */
        
        const bodyFormData = new FormData();
        bodyFormData.append("title", title);
        bodyFormData.append("amount", amount);
        bodyFormData.append("currency", currency);
        bodyFormData.append("type", type);
        bodyFormData.append("date", date);
        bodyFormData.append("description", description);
        imagesArr.forEach((fileHandle)=>{
            // This works because with FormData, we're appending File objects to the same key.
            //   Think of FormData as a HashMap, where each entry is an ArrayList.
            //   We append item to the ArrayList indexed by the key.
            // On the server, I will extract the data from FormData object.
            bodyFormData.append("images[]", fileHandle);
        });

        await httpClient.post('/api/claims/', bodyFormData).then(function(response) {
            console.log(`[CREATE CLAIM] Successfully created claim 👍. Status: ${response.status}`);
            // navigate("/my-expenses");
        }).catch(function(error) {
            console.error(`[CREATE CLAIM] Failed to create claim. Status: ${error.response.status}`);
        });
        return;
    };

    useEffect(() => {
        document.title = "Create New Claim";
    }, [])

    return(
        <div>
            <NavBar />
            <Animate_page>
            <div className='create'>
                <div className='createContainer'>
                    <legend className='createLegend'>Create Claim</legend>
                    <form className='createForm' onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                className='infield titleInput'
                                name='title'
                                placeholder='Title...'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Expense Type</label>
                            <select
                                name="expenseType"
                                className='infield typeInput'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="" disabled selected hidden>Type of Expense</option>
                                <option value="Travel">Travel Expense</option>
                                <option value="Accomomdation">Accomodation Expense</option>
                                <option value="Catering">Catering Expense</option>
                            </select>
                        </div>

                        <div>
                            <div className='inlineContainer'>
                                <div>
                                    <label>Currency</label>
                                    <select
                                        name="currencyType"
                                        className='infield currencyInput'
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled selected hidden>Currency</option>
                                        <option value="€">EUR €</option>
                                        <option value="£">GBP £</option>
                                        <option value="$">USD $</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        className='infield amountInput'
                                        name='amount'
                                        placeholder='Amount'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        step="0.01"
                                        min="0.01"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                className='infield dateInput'
                                name="date"
                                placeholder='Date of expense'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                max={new Date().toJSON().slice(0, 10)}
                                required
                            />
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea
                                name="description"
                                className='infield descriptionInput'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                required
                            />
                        </div>

                    <div>
                        <div className="proofArea">
                            {
                                (imagesArr.length > 0) ? (
                                    imagesArr.map((fileHandle)=>{
                                        return (
                                        <>
                                            <img
                                                data-file={fileHandle} 
                                                src={URL.createObjectURL(fileHandle)}
                                                alt="uploaded proof"
                                                className='proofPreview'
                                            />

                                            <button
                                                type='button'
                                                className='cancelButton'
                                                onClick={() => {
                                                    // const targetButton = evt.target;
                                                    // const imgElement = targetButton.previousSibling; // this is <img> elem.
                                                    removeAnImage(fileHandle);
                                                    setImage(null);
                                                    setPreview(null);
                                                    console.log(`Attempted to remove this image ${fileHandle}.`);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </>
                                        )
                                    })
                                ) : (
                                    <>
                                        <p>No images here yet.</p>
                                    </>
                                )
                            }
                            <>
                                <CiImageOn/>
                                <input
                                    className='imageInput'
                                    id='file'
                                    name='file'
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        addAnImage(e.target.files[0]);
                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                    }} 
                                    multiple 
                                    required
                                />
                                <label htmlFor="file" className='almostButton'>Upload an Image</label>
                            </>
                        </div>
                    </div>

                    <b className="infield clearSubmit saveDraftSubmit" onClick={()=>{
                        saveAsDraft({title, type, currency, amount, date, description, image: recentImage});
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
            </div>
            </Animate_page>
        </div>
    )
}

export default CreateClaim;
import { useState, useEffect } from 'react'
import NavBar from "./NavBar";
import '../css/CreateClaim.css';
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import Animate_page from './Animate-page';
import { ls_keys } from './utils';
import { ensureLS_saveDraftClaim_exists } from './utils';
import { addToDraftsArr, editDraft, removeFromDraftsArr } from './MyExpenses.jsx';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal.jsx';


const ls_key = "fdm-expenses-client/create-claim/form-data";

function combineArrays(...arrs) {
    return arrs.reduce((acc, arr)=> acc.concat(arr), []);
};

function isNullish(value) {
    return value === null || value === undefined;
};
function isFile(thing) {
    return thing instanceof File;
};

/**
 * @typedef {{
 * id: number,
 * title: string,
 * image: string,
 * imageContentsBase64: string,
 * imageFileName: string,
 * contentType?: string
 * }} ReceiptMetaInfo
 */
/**
 * # Meta-info for Receipts
 * Format:
 * - id: number
 * - image: string
 * - imageContentsBase64: string
 * - title: string
 * @param {ReceiptMetaInfo} thing 
 * @returns {boolean}
 */
function isReceiptMetaInfo(thing) {
    return thing instanceof Object && !isNullish(thing["image"]);
};

// const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];
  
//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//         const slice = byteCharacters.slice(offset, offset + sliceSize);
    
//         const byteNumbers = new Array(slice.length);
//         for (let i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//         }
    
//         const byteArray = new Uint8Array(byteNumbers);
//         byteArrays.push(byteArray);
//     }
      
//     const blob = new Blob(byteArrays, {type: contentType});
//     return blob;
// };
/**
 * 
 * @param {ReceiptMetaInfo} receiptMetaInfo 
 * @param {(blob: Blob) => void} onsuccess
 * @param {(error: Error) => void} onerror
 */
async function buildFileFromReceiptMetaInfo(receiptMetaInfo, onsuccess, onerror) {
    try {
        const fileName = String(receiptMetaInfo.imageFileName);
        const fileExtension = fileName.split(".").pop();
        const fileContentsBase64 = receiptMetaInfo["imageContentsBase64"];
        const contentType = `image/${fileExtension}`;
        // THIS IS AN INTENTIONAL MUTATION OF THE OBJECT
        receiptMetaInfo["contentType"] = contentType;
        console.log(`[BUILD FILE FROM RECEIPT META-INFO] Built file from receipt meta-info: `, receiptMetaInfo);
        
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        console.log(`[BUILD FILE FROM RECEIPT META-INFO] Created canvas: `, canvas);
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            console.log(`[BUILD FILE FROM RECEIPT META-INFO] Drew image on canvas: `, img, canvas);
            canvas.toBlob(onsuccess);
            console.log(`[BUILD FILE FROM RECEIPT META-INFO] Converted canvas to blob: `, canvas);
        };
        img.src = fileContentsBase64;
        return {
            fileName, fileExtension, fileContentsBase64, contentType
        };
    } catch(err) {
        onerror(err);
        return {
            fileName: undefined, fileExtension: undefined, fileContentsBase64: undefined, contentType: undefined
        };
    }
    // return new File([blob], fileName, {type: contentType});
};



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
    const { claimId, title, type, currency, amount, date, description, imagesArr } = details;

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
    if (!isNullish(imagesArr)) {
        imagesArr.forEach((fileHandle)=>{
            // This works because with FormData, we're appending File objects to the same key.
            //   Think of FormData as a HashMap, where each entry is an ArrayList.
            //   We append item to the ArrayList indexed by the key.
            // On the server, I will extract the data from FormData object.
            bodyFormData.append("images[]", fileHandle);
        });
    } else {
        bodyFormData.append("images[]", null);
    }

    /**
     * @type {Promise<Response>}
     */
    let request = undefined;
    let api_endpoint = "";
    let isEditingDraft = false;
    if (isNullish(claimId)) {
        // this means submitting a draft
        api_endpoint = "/api/claims/drafts";
        request = httpClient.post(api_endpoint, bodyFormData);
        isEditingDraft = false;
    } else {
        // this means want to edit a draft with particular claimId
        api_endpoint = `/api/claims/drafts/${claimId}`;
        request = httpClient.patch(api_endpoint, bodyFormData);
        isEditingDraft = true;
    }

    // await httpClient.post("/api/claims/drafts", bodyFormData)
    request.then(function(response) {
        console.log(`[${isEditingDraft ? "EDIT" : "CREATE"} DRAFT-CLAIM] Successfully ${isEditingDraft ? "edited" : "created"} draft-claim 👍. Status: ${response.status}`);
        console.log(`Response data: `, response.data);

        /**
         * These fields are KNOWN, as it's what server returns.
         */
        const {id, message} = response.data;
        const claim_id = id;

        if (isEditingDraft) {
            editDraft(claim_id, details);
            window.alert(`Edited draft 👍!`);
        } else {
            addToDraftsArr(claim_id, details);
            window.alert(`Successfully saved draft 👍!`);
        }

        // navigate("/my-expenses");
    }).catch(function(error) {
        console.error(`[${isEditingDraft ? "EDIT" : "CREATE"} DRAFT-CLAIM] Failed to ${isEditingDraft ? "edit" : "create"} draft-claim. Status: ${error.response.status}`);
    });
    return;

    /**
     * @type {Response}
     */
    // const response = await fetch(reqClaims);
    // try {
    //     if (response.status === 200) {
    //         const json = await response.json();
    //         console.info(`saveAsDraft : response: `, json);
    //         // server is returning {"id": number, "message": string}
    //         // so we unpack that
    //         const {id, message} = json;
    //         if (id !== undefined && id !== null) {
    //             ls_draftStorage["most-recent-draft"] = id;
    //             ls_draftStorage["most-recent-timestamp"] = Date.now();
    //             ls_draftStorage["draft_ids"].push(id);
    //             window.localStorage.setItem(ls_keys["save-draft-claim"], JSON.stringify(ls_draftStorage));
    //             console.log(`saveAsDraft : Draft-claim created with id: ${id}.`);
    //             window.alert(`This has been saved as a draft, and the form has been cleared.\nTo open the draft, go to the \"My Expenses\" section.`);

    //             addToDraftsArr(id, details);
    //         } else {
    //             console.error(`saveAsDraft : Failed to create draft-claim. Id was nullish.`);
    //         }
    //     } else {
    //         console.error(`saveAsDraft : Failed to do/view claim. Status: ${response.status}`);
    //     }
    // } catch (e) {
    //     console.error(e);
    // }

    // console.info(`Save as Draft: `, {details});
    // return;
};


export function CreateClaim () {
    let alreadyLoadedDraft = false;
    let manuallyRerenderedViaTitleCounter = 0;
    let manualTitleTimeout = undefined;
    const [claimId, set_claimId] = useState(null);
    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [recentImage, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showClearModal, setShowClearModal] = useState(false);

    const _CreateClaim = this;

    const [_rerender_counter, set_rerender_counter] = useState(0);

    /**
     * @type {[File[], (images: File[]) => void}
     */
    const [imagesArr, setImagesArr] = useState([]);
    /**
     * 
     * @param {File[]} files 
     * @returns {void}
     */
    const addImages = (...files)=>{
        /**
         * @type {File[]}
         */
        const thingToCopy = isNullish(imagesArr) ? [] : imagesArr;
        const tempCopy = Array.from(thingToCopy);
        tempCopy.push(...files);
        setImagesArr(tempCopy);
        console.info(`[ADD AN IMAGE] I pushed `, files);
        // console.info(`[ADD AN IMAGE] Images array is now: `, imagesArr);
        // THIS METHOD DOESN'T IMMEDIATELY KNOW WHAT imagesArr IS! REACT IS STRANGE!
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
            console.info(`[REMOVE IMAGE] I removed `, imageThing);
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
        console.log(`Recent image is `, recentImage);
        console.log(`Images Arr: `, imagesArr);
    }, [recentImage, imagesArr]);

    const do_forceUpdate = ()=>{
        // CreateClaim.forceUpdate();
        _CreateClaim.setState({rerender_counter: _rerender_counter + 1, imagesArr: imagesArr});
    };

    let { state } = useLocation();
    useEffect(()=>{
        console.log(state);
        if (state !== null && !alreadyLoadedDraft && state["draftClaim"] !== undefined) {
            console.log(`Draft claim found in state: `, state["draftClaim"]);
            alreadyLoadedDraft = true;
            const { amount, claim_id, currency, date, description, expenseType, receipts, status, title, user_id, imagesArr } = state["draftClaim"];
            set_claimId(claim_id);
            setTitle(title);
            setType(expenseType);
            setCurrency(currency);
            setAmount(amount);
            setDate(date);
            setDescription(description !== "null" ? description : "");
            /**
             * @type {(Object | File)[]}
             */
            let imagesMetaArr_toSet = [];
            if (!isNullish(receipts)) {
                console.info(`Receipts are: `, receipts);
                receipts.forEach(
                    /**
                     * @param {ReceiptMetaInfo} receiptMetaInfo
                     */
                    async(receiptMetaInfo)=>{

                    console.log(`Receipt meta-info: `, receiptMetaInfo);
                    await buildFileFromReceiptMetaInfo(receiptMetaInfo, (blob)=>{
                        console.log(`Built blob from receipt meta-info: `, blob)
                        const fileHandle = new File([blob], receiptMetaInfo.imageFileName, {type: receiptMetaInfo.contentType});
                        console.log(`Built file from receipt meta-info: `, fileHandle)
                        imagesMetaArr_toSet.push(fileHandle);
                        console.log(`imagesMetaArr_toSet is now: `, imagesMetaArr_toSet);
                    }, (err)=> console.error(err));
                    set_rerender_counter(_rerender_counter + 1);
                    do_forceUpdate();
                });
                // imagesMetaArr_toSet.push(...receipts);
            }
            if (!isNullish(imagesArr)) {
                imagesMetaArr_toSet.push(...imagesArr);
            }
            setImagesArr(imagesMetaArr_toSet);
            set_rerender_counter(_rerender_counter + 1);
            // do_forceUpdate();

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
    }, [claimId, state, alreadyLoadedDraft, setTitle, setType, setCurrency, setAmount, setDate, setDescription]);

    useEffect(()=>{
        console.log(`Title is: `, title);
        if (manualTitleTimeout === undefined) {
            manualTitleTimeout = setTimeout(()=>{
                if (manuallyRerenderedViaTitleCounter < 1) {
                    // setTitle(title);
                    set_rerender_counter(_rerender_counter + 1);
                    // manually trigger re-render so image previews appear?
                    manuallyRerenderedViaTitleCounter += 1;
                }
                manualTitleTimeout = false;
            }, 1000);
        }
    }, [title, _rerender_counter, manualTitleTimeout]);

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
        if (!isNullish(imagesArr) && imagesArr.length > 0) {
            imagesArr.forEach((fileHandle)=>{
                // This works because with FormData, we're appending File objects to the same key.
                //   Think of FormData as a HashMap, where each entry is an ArrayList.
                //   We append item to the ArrayList indexed by the key.
                // On the server, I will extract the data from FormData object.
                bodyFormData.append("images[]", fileHandle);
            });
        } else {
            console.error(`[CREATE CLAIM] No images were uploaded. Please upload at least one image.`);
            window.alert(`Please upload at least one image!`);
            return;
        }

        /**
         * @type {Promise<Response>}
         */
        let request = undefined;
        const isFreshForm = isNullish(claimId);
        const wasEditingADraft = !isFreshForm;
        let api_endpoint = "";
        if (wasEditingADraft) {
            // this means submitting this draft, becomes pending claim
            api_endpoint = `/api/claims/drafts/${claimId}/submit`;
            request = httpClient.post(api_endpoint, bodyFormData);
        } else {
            // this means want to submit fresh form, no drafts involved
            api_endpoint = "/api/claims/";
            request = httpClient.post(api_endpoint, bodyFormData);
        }

        await request.then(function(response) {
            console.log(`[CREATE CLAIM] Successfully ${wasEditingADraft ? "submitted draft ➡ pending-claim" : "created claim"} 👍. Status: ${response.status}`);
            console.log(`Response data: `, response.data);
            removeFromDraftsArr(claimId);
            navigate("/my-expenses");
        }).catch(function(error) {
            console.error(`[CREATE CLAIM] Failed to ${wasEditingADraft ? "submit draft ➡ pending-claim" : "create claim"}. Status: ${error.response.status}`);
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
                            {/* <label>Title</label> */}
                            <input
                                type="text"
                                className='infield titleInput'
                                name='title'
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            {/* <label>Expense Type</label> */}
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
                                    {/* <label>Currency</label> */}
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
                                    {/* <label>Amount</label> */}
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
                            {/* <label>Date</label> <br /> */}
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
                            {/* <label>Description</label> */}
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
                            <section className="proofArea-picture-gallery">
                                {
                                    ( !isNullish(imagesArr) && imagesArr.length > 0) ? (
                                        imagesArr.filter(thing => isFile(thing)).map((fileHandle)=>{
                                            return (
                                            <>
                                                <article className="proof-image-holder">
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
                                                </article>
                                            </>
                                            )
                                        })
                                    ) : (
                                        <>
                                            <p>No images here yet.</p>
                                        </>
                                    )
                                }
                            </section>
                            <section className="proofArea-upload-footer">
                                <CiImageOn/>
                                <input
                                    className='imageInput'
                                    id='file'
                                    name='file'
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => {
                                        const filesPicked = e.target.files;
                                        console.log(`files picked: `, filesPicked);
                                        if (!isNullish(filesPicked)) {
                                            addImages(...filesPicked);
                                        }
                                        for (let fileHandle of filesPicked) {
                                            setImage(fileHandle);
                                            setPreview(URL.createObjectURL(fileHandle));
                                        }
                                    }} 
                                    multiple 
                                    required
                                />
                                <label htmlFor="file" className='almostButton'>Upload an Image</label>
                            </section>
                        </div>
                    </div>
                        <div className='buttons'>
                            <button type="button" className="infield clearSubmit saveDraftSubmit" onClick={()=>{
                                saveAsDraft({claimId, title, type, currency, amount, date, description, imagesArr});
                            }}>Save as Draft</button>

                            <button className='infield createSubmit'>Submit Claim</button>
                            
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
                                <button type="button" className='infield clearSubmit' 
                                    onClick={() => setShowClearModal(true)}
                                >
                                    Clear form
                                </button>
                            </Link>

                            <Modal open={showClearModal} onClose={() => setShowClearModal(false)}>
                                <div className="draft-clear-modal">
                                    <div>Are you sure you want to clear?</div>

                                    <div className="options">
                                        <div className="cancel" onClick={() => setShowClearModal(false)}>
                                            Cancel
                                        </div>

                                        <div className="clear" onClick={() => {
                                            setTitle("");
                                            setType("");
                                            setCurrency("");
                                            setAmount("");
                                            setDate("");
                                            setDescription("");
                                            setImagesArr([]);
                                            setImage(null);
                                            setPreview(null);
                                            alreadyLoadedDraft = true;   
                                            setShowClearModal(false);   
                                        }}>
                                            OK
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </form>
                </div>
            </div>
            </Animate_page>
        </div>
    )
}

export default CreateClaim;
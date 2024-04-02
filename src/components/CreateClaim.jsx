import React, { useState, useEffect } from 'react'
import NavBar from "./NavBar";
import '../css/CreateClaim.css';
import { CiImageOn } from "react-icons/ci";
import { getApiURL } from './api';

const ls_key = "fdm-expenses-client/create-claim/form-data";

export function CreateClaim () {
    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    
    async function handeSubmit(e) {
        e.preventDefault();
        // stuff that will handle the inputs


        // for now it will just alarm the user with the
        // inputted data for debugging puproses
        alert(`Successful submit. \nTitle: ${title} \nType: ${type} \nCurrency: ${currency} \nAmount: ${amount} \nDate: ${date} \nDescription: ${description} \nImage: ${image} \nPreview: ${preview}`);
        console.log(image);
        const data = localStorage.getItem(ls_key);
        console.log(`localstorage data: `, {data});
        // if (data) {
        //     const parsed = JSON.parse(data);
        //     const imgElement = document.createElement("img");
        //     imgElement.src = parsed.image;
        //     const legend = document.querySelector("legend");
        //     legend?.appendChild(imgElement);
        // }

        // const a = getApiURL("/claims");
        // console.info({a});
        // const b = getApiURL("/claims/{id}", [12345, 67890]);
        // console.info({b});
        // const c = getApiURL("/claims/{id}/images", [12345, 67890]);
        // console.info({c});


        // const loginResponse = await fetch(getApiURL("/auth/login"), {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         'Accept': 'application/json',
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({username: "armin2", password: "password"})
        // });
        // // cookie is set automatically by the browser
        // try {
        //     const json = await loginResponse.json();
        //     console.info(json);
        // } catch (e) {
        //     console.error(e);
        // }


        const image_contents_base64 = "something";
        const output_to_server = {
            title, type, currency, amount, date, description, image: image_contents_base64
        };
        const reqClaims = new Request(getApiURL("/claims"), {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(output_to_server),
        });
        console.info({reqClaims});
        /**
         * @type {Response}
         */
        const response = await fetch(reqClaims);
        try {
            if (response.status === 200) {
                const json = await response.json();
                console.info(json);
            } else {
                console.error(`Failed to do/view claim. Status: ${response.status}`);
            }
        } catch (e) {
            console.error(e);
        }


        // const logoutResponse = await fetch(getApiURL("/auth/logout"), {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         'Accept': 'application/json',
        //         "Content-Type": "application/json"
        //     }
        // });
        // try {
        //     const json = await logoutResponse.json();
        //     console.info(json);
        // } catch (e) {
        //     console.error(e);
        // }



        return response;
    }

    /**
     * Check if a value is null or undefined
     * @param {any} thing - The value to check
     * @returns {boolean} - True if the value is null or undefined, false otherwise
     */
    function isNullish(thing) {
        return thing === null || thing === undefined;
    };

    useEffect(()=>{
        const data = localStorage.getItem(ls_key);
        if (data) {
            const parsed = JSON.parse(data);
            setTitle(parsed.title);
            setType(parsed.type);
            setCurrency(parsed.currency);
            setAmount(parsed.amount);
            setDate(parsed.date);
            setDescription(parsed.description);

            // create new image from imageData in "image"
            const image = new Image();
            image.src = parsed.image;
            const blob = new Blob([parsed.image], {type: "image/png"});
            const file = new File([blob], "some-image.png", {type: "image/png"});
            setImage(file);

            // const imgElement = document.createElement("img");
            // imgElement.src = parsed.image;
            // console.log(imgElement);
            // const legend = document.querySelector("legend");
            // console.log(legend, imgElement);
            // legend?.appendChild(imgElement);
            // imgElement.onload = ()=>{
            // };
            // imgElement.style.display = "block";
            console.log(file, blob);
            setPreview(URL.createObjectURL(file));

            localStorage.removeItem(ls_key);
        }
    }, []);
    useEffect(()=>{
        const thingsToCheck = [title, type, currency, amount, date, description, image];
        const handleBeforeUnload = (evt)=>{
            const somethingIsBlank = thingsToCheck.some(isNullish);
            console.log(`Checking for nullish values: ${thingsToCheck.map((v)=>{console.log(v);return isNullish(v);})}`);
            if (!somethingIsBlank) {
                // nothing is left blank, no need to hold them here.
                evt.returnValue = false;
            }

            if (!image) {
                // no image is selected, no need to hold it here.
                evt.returnValue = false;
                return;
            }

            /**
             * @type {File}
             */
            const _img = image;
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgBase64Data = reader.result;
                // Use the base64Data as needed
                
                const data_to_save = {
                    title, type, currency, amount, date, description, image: imgBase64Data
                };
                console.log(data_to_save);
                localStorage.setItem(ls_key, JSON.stringify(data_to_save));
            };
            reader.readAsDataURL(_img);

            evt.returnValue = true;
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };

    }, [title, type, currency, amount, date, description, image]);


    document.title = "Create new claim"
    return(
        <div>
            <NavBar />
            <div className='createContainer'>
                <legend className='createLegend'>Create Claim</legend>
                <form className='createForm' onSubmit={handeSubmit}>
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
                            <option value="GBP">£</option>
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
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
                    <b 
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
                    </b>
                    <button className='infield createSubmit'>Submit Claim</button>
                </form>
            </div>
        </div>
    )
}

export default CreateClaim;
import React, { useState } from 'react'
import NavBar from "./NavBar";
import '../css/CreateClaim.css'
import { CiImageOn } from "react-icons/ci";

export function CreateClaim () {
    const [title, setTitle] = useState();
    const [type, setType] = useState();
    const [currency, setCurrency] = useState();
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState();

    function handeSubmit (e) {
        e.preventDefault();
        // stuff that will handle the inputs


        // for now it will just alarm the user with the
        // inputted data for debugging puproses
        alert(`Successful submit. \nTitle: ${title} \nType: ${type} \nCurrency: ${currency} \nAmount: ${amount} \nDate: ${date} \nDescription: ${description} \nImage: ${image} \nPreview: ${preview}`);
        console.log(image)
    }

    document.title = "Create new claim"
    return(
        <div>
            <NavBar/> 
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
                        <option value="Accomomdation">Accomomdation Expense</option>
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
                    <button className='infield createSubmit'>Submit Claim</button>
                </form>
            </div>
        </div>
    )
}

export default CreateClaim;
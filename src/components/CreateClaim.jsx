import React, { useState } from 'react'
import '../css/CreateClaim.css'

function CreateClaim () {
    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState(null);

    function handeSubmit (e) {
        e.preventDefault();
        // stuff that will handle the inputs


        // for now it will just alarm the user with the
        // inputted data fo8r debugging puproses
        alert(`Successful submit. \nTitle: ${title} \nType: ${type} \nCurrency: ${currency} \nAmount: ${amount} \nDescription: ${description}`);
    }

    document.title = "Create new claim"
    return(
        <div className='createContainer'>
            <legend className='createLegend'>Create Claim</legend>
            <form className='createForm' onSubmit={handeSubmit}>
                <input type="text" className='infield titleInput' placeholder='Title...' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                <select name="expenseType" className='infield typeInput' value={type} onChange={(e) => {setType(e.target.value)}}>
                    <option value="placeholder" disabled selected>Type of Expense</option>
                    <option value="Travel">Travel Expense</option>
                    <option value="Accomomdation">Accomomdation Expense</option>
                    <option value="Catering">Catering Expense</option>
                </select>
                <div className='inlineContainer'>
                    <select name="currencyType" className='infield currencyInput' value={currency} onChange={(e) => {setCurrency(e.target.value)}}>
                        <option value="placeholder" disabled selected>Currency</option>
                        <option value="GBP">£</option>
                        <option value="USD">$</option>
                        <option value="EUR">€</option>
                    </select>
                    <input type="number" className='infield amountInput' placeholder='Amount' value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
                </div>
                <textarea name="description" className='infield descriptionInput' placeholder='Description' value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                {/* TODO: SOMEHOW ADD UPLOAD PICTURE */}
                <button className='createSubmit'>Submit Claim</button>
            </form>
        </div>
    )
}

export default CreateClaim;
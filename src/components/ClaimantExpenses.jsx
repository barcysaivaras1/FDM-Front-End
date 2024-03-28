import '../css/ClaimantExpenses.css'
import React from 'react';

function ClaimantExpenses(){
    return(
        <div className='ViewExpensesPage'>
            <div id='PhoneBox'>
                <h1 id='Title'>View Expenses</h1>
                <h2 className='ExpenseType'>Pending</h2>
                <h2 className='ExpenseType'>Rejected</h2>
                <h2 className='ExpenseType'>Accepted</h2>
            </div>
        </div>
    )
}
export default ClaimantExpenses;
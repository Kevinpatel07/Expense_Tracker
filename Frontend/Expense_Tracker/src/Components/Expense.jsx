import React from 'react'

const Expense = ({closeUp}) => {
    return (
        <div className='expense-popup-overlay'>
            <div className='expense-popup-content'>
                <div>
                    <h1>New Expense</h1>
                </div>

                <div className='expense-data'>
                    <label htmlFor="category">Category:</label>
                    <select className='type' id="category">
                        <option disabled value="">Select</option>
                        <option value="">Food/Drinks</option>
                        <option value="">Shopping</option>
                        <option value="">Transportation</option>
                        <option value="">Entertainment</option>
                        <option value="">Home</option>
                        <option value="">Family</option>
                        <option value="">Health/Sport</option>
                        <option value="">Pets</option>
                        <option value="">Travels</option>
                        <option value="">Other Expenses</option>
                    </select>

                    <label htmlFor="amount">Amount:</label>
                    <input className='type' type="number" id="amount" />

                    <label htmlFor="account">Account:</label>
                    <select className='type' id="account">
                        <option disabled value="/">Select</option>
                        <option value="">Wallet</option>
                        <option value="">Bank Account</option>
                    </select>

                    <label htmlFor="date">Date:</label>
                    <input className='type' type="date" id="date" />

                    <label htmlFor="time">Time:</label>
                    <input className='type' type="time" id="time" />

                    <label htmlFor="note">Note:</label>
                    <input className='type' type="text" id="note" placeholder='Optional' />
                </div>

                <div className='expense-content-button'>
                    <button onClick={closeUp}>Save</button>
                    <button onClick={closeUp}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default Expense

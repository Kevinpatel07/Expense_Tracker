import React, { useContext, useState } from 'react'
import { path } from '../ContextAPI/path.context'
import api from '../utils/axiosInstance'

const Expense = ({ closeUp, setpopUp }) => {
    const { settransactions } = useContext(path)
    const [expenses, setexpenses] = useState({ category: "", amount: "", account: "", date: "", time: "", note: "" })

    const handleExpenses = (event) => {
        const { name, value } = event.target
        setexpenses({ ...expenses, [name]: value })
    }

    const handleSave = async () => {

        try {
            const res = await api.post('/expenses/add-expenses', {
                category: expenses.category,
                amount: -Math.abs(Number(expenses.amount)),
                account: expenses.account,
                date: expenses.date,
                time: expenses.time,
                note: expenses.note
            })

            settransactions((prev)=>[...prev , res.data.addexpenses])
            setpopUp(null)


        } catch (error) {
            console.log(error)
            console.error('Frontend Add Expenses Error', error.response?.data?.message)
        } 
    }

    return (
        <div className='expense-popup-overlay'>
            <div className='expense-popup-content'>
                <div>
                    <h1>New Expense</h1>
                </div>

                <div className='expense-data'>
                    <label htmlFor="category">Category:</label>
                    <select onChange={handleExpenses} name='category' value={expenses.category} className='type' id="category">
                        <option disabled value="">Select</option>
                        <option value="Food/Drinks">Food/Drinks</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Home">Home</option>
                        <option value="Family">Family</option>
                        <option value="Health/Sport">Health/Sport</option>
                        <option value="Pets">Pets</option>
                        <option value="Travels">Travels</option>
                        <option value="Other Expenses">Other Expenses</option>
                    </select>

                    <label htmlFor="amount">Amount:</label>
                    <input onChange={handleExpenses} name='amount' value={expenses.amount} className='type' type="number" id="amount" />

                    <label htmlFor="account">Account:</label>
                    <select onChange={handleExpenses} name='account' value={expenses.account} className='type' id="account">
                        <option disabled value="">Select</option>
                        <option value="Wallet">Wallet</option>
                        <option value="Bank Account">Bank Account</option>
                    </select>

                    <label htmlFor="date">Date:</label>
                    <input onChange={handleExpenses} name='date' value={expenses.date} className='type' type="date" id="date" />

                    <label htmlFor="time">Time:</label>
                    <input onChange={handleExpenses} name='time' value={expenses.time} className='type' type="time" id="time" />

                    <label htmlFor="note">Note:</label>
                    <input onChange={handleExpenses} name='note' value={expenses.note} className='type' type="text" id="note" placeholder='Optional' />
                </div>

                <div className='expense-content-button'>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={closeUp}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default Expense

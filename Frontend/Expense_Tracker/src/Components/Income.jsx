import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { path } from '../ContextAPI/path.context'
import api from '../utils/axiosInstance'

const Income = ({setpopUp}) => {
    const { settransactions } = useContext(path)
    const [incomedata, setincomedata] = useState({ category: "", amount: "", account: "", date: "", time: "", note: "" })

    const handleIncomedata = (event) => {
        const { name, value } = event.target
        setincomedata({ ...incomedata, [name]: name == 'amount' ? Number(value) : value })
    }

    const handleSave = async () => {
        try {
            const res = await api.post('/incomes/add-income', {
                category: incomedata.category,
                amount: incomedata.amount,
                account: incomedata.account,
                date: incomedata.date,
                time: incomedata.time,
                note: incomedata.note
            })
            settransactions((prev)=>  [...prev, res.data.addIncome])

            setpopUp(null)  
        } catch (error) {
            console.log(error)
            console.error('Frontend Add Income Error', error.response?.data?.message)
        }
    }


    return (
        <div className='income-popUp-overlay'>
            <div className='income-popUp-content'>
                <div>
                    <h1>New Income</h1>
                </div>

                <div className='income-data'>
                    <label htmlFor="category">Category:</label>
                    <select onChange={handleIncomedata} className='type' id="category" name="category" value={incomedata.category}>
                        <option disabled value="">Select</option>
                        <option value="Financial Income">Financial Income</option>
                        <option value="Salary">Salary</option>
                        <option value="Pension">Pension</option>
                        <option value="Pocket Money">Pocket Money</option>
                        <option value="Other Income">Other Income</option>
                    </select>

                    <label htmlFor="amount">Amount:</label>
                    <input onChange={handleIncomedata} className='type' type='number' id="amount" value={incomedata.amount} name="amount" placeholder='Enter amount' />

                    <label htmlFor="account">Account:</label>
                    <select onChange={handleIncomedata} className='type' name="account" value={incomedata.account} id="account">
                        <option disabled value="">Select</option>
                        <option value="Wallet">Wallet</option>
                        <option value="Bank Account">Bank Account</option>
                    </select>

                    <label htmlFor="date">Date:</label>
                    <input onChange={handleIncomedata} className='type' type="date" name="date" value={incomedata.date} id="date" />

                    <label htmlFor="time">Time:</label>
                    <input onChange={handleIncomedata} className='type' type="time" name="time" value={incomedata.time} id="time" />

                    <label htmlFor="note">Note:</label>
                    <input onChange={handleIncomedata} className='type' type="text" id="note" name="note" value={incomedata.note} placeholder='Optional' />
                </div>

                <div className='income-content-button'>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={()=> setpopUp(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Income

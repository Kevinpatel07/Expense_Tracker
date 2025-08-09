import React, { useContext, useState } from 'react'
import api from '../utils/axiosInstance'
import { path } from '../ContextAPI/path.context'

const Edit_Transaction_income = ({ editpopup, transactionId }) => {
  const { settransactions } = useContext(path)
  const [edit, setedit] = useState({ category: "", amount: "", account: "", date: "", time: "", note: "" })

  const handleedit = (event) => {
    const { name, value } = event.target
    setedit({ ...edit, [name]: name == 'amount' ? Number(value) : value })
  }

  const handleeditsave = async () => {
    try {
      const res = await api.patch(`/incomes/edit-income/${transactionId}`, {
        category: edit.category,
        amount: edit.amount,
        account: edit.account,
        date: edit.date,
        time: edit.time,
        note: edit.note
      })

      settransactions((prev) =>
        prev.map((item) =>
          item._id === transactionId ? res.data.edit : item
        )
      )
      editpopup(null)
      alert("Transaction Updated")

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className='edit-transaction-income'>
      <div className='edit-transaction-income-content'>
        <div>
          <h1>Edit Transaction</h1>
        </div>


        <div className='edit-transaction-content-inputs'>
          <label htmlFor="category">Category:</label>
          <select onChange={handleedit} name='category' value={edit.category} className='inputs' id="category">
            <option disabled value="">Select</option>
            <option value="Financial Income">Financial Income</option>
            <option value="Salary">Salary</option>
            <option value="Pension">Pension</option>
            <option value="Pocket Money">Pocket Money</option>
            <option value="Other Income">Other Income</option>
          </select>

          <label htmlFor="amount">Amount:</label>
          <input onChange={handleedit} name='amount' value={edit.amount} className='inputs' type='number' id="amount" placeholder='Enter amount' />

          <label htmlFor="account">Account:</label>
          <select onChange={handleedit} name='account' value={edit.account} className='inputs' id="account">
            <option disabled value="">Select</option>
            <option value="Wallet">Wallet</option>
            <option value="Bank Account">Bank Account</option>
          </select>

          <label htmlFor="date">Date:</label>
          <input onChange={handleedit} name='date' value={edit.date} className='inputs' type="date" id="date" />

          <label htmlFor="time">Time:</label>
          <input onChange={handleedit} name='time' value={edit.time} className='inputs' type="time" id="time" />

          <label htmlFor="note">Note:</label>
          <input onChange={handleedit} name='note' value={edit.note} className='inputs' type="text" id="note" placeholder='Optional' />
        </div>

        <div className='edit-transaction-income-content-buttons'>
          <button onClick={handleeditsave}>Save</button>
          <button onClick={() => editpopup(null)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Edit_Transaction_income

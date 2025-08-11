import React, { useContext, useState } from 'react'
import { path } from '../ContextAPI/path.context'
import api from '../utils/axiosInstance'

const Edit_Transaction_Expense = ({editpopup , transactionId}) => {
  const {settransactions} = useContext(path)
  const [editexpense , seteditexpense] = useState({category:"" , amount:"" , account:"" , date:"" , time:"" , note:""})

  const handleExpenses = (event)=>{
    const {name , value} = event.target
    seteditexpense({...editexpense , [name] :value})
  }

  const handleExpense_Save = async()=>{
    try {
      const res = await api.patch(`/expenses/edit-expense/${transactionId}` , {
        category : editexpense.category,
        amount: -Math.abs(Number(editexpense.amount)),
        account:editexpense.account,
        date:editexpense.date,
        time:editexpense.time,
        note:editexpense.note
      })

      settransactions((prev) => prev.map((item)=>
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
    <div className="edit-transaction-expenses">
      <div className="edit-transaction-expenses-content">
        <div>
          <h1>Edit Expense</h1>
        </div>

        <div className="edit-transaction-expenses-content-inputs">
          <label htmlFor="category">Category:</label>
          <select onChange={handleExpenses} className="inputs" name='category' value={editexpense.category} id="category">
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
          <input onChange={handleExpenses} className="inputs" name='amount' value={editexpense.amount}  type="number" id="amount" />

          <label htmlFor="account">Account:</label>
          <select onChange={handleExpenses} className="inputs" name='account' value={editexpense.account} id="account">
            <option disabled value="">Select</option>
            <option value="Wallet">Wallet</option>
            <option value="Bank Account">Bank Account</option>
          </select>

          <label htmlFor="date">Date:</label>
          <input onChange={handleExpenses} className="inputs" name='date' value={editexpense.date} type="date" id="date" />

          <label htmlFor="time">Time:</label>
          <input onChange={handleExpenses} className="inputs" name='time' type="time" value={editexpense.time} id="time" />

          <label htmlFor="note">Note:</label>
          <input onChange={handleExpenses} className="inputs" name='note' type="text" value={editexpense.note} id="note" placeholder='Optional' />
        </div>

        <div className='edit-transaction-expenses-content-buttons'>
          <button onClick={handleExpense_Save}>Save</button>
          <button onClick={()=> editpopup(null)}>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default Edit_Transaction_Expense

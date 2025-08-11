import React, { useContext, useEffect, useState } from 'react'
import { path } from '../ContextAPI/path.context'
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import api from '../utils/axiosInstance';
import Edit_Transaction_income from './Edit_Transaction_income';
import Edit_Transaction_Expense from './Edit_Transaction_Expense';

const Transaction = () => {
  const { settitle, transactions, settransactions } = useContext(path)
  const [editDeleteDropdown, seteditDeleteDropdown] = useState(null)
  const [searchTerm, setsearchTerm] = useState({ category: "", note: "" })
  const [typeFilter, settypeFilter] = useState({ income: false, expense: false })
  const [currentMonth, setcurrentMonth] = useState(new Date())
  const [editPopup , seteditPopup] = useState(null)

  const Alltransaction = async ()=>{
    try {
      const incomeres = await api.get('/incomes/get-income')
      const expenseres = await api.get('/expenses/get-expenses')

      settransactions([...incomeres.data.getincometransaction , ...expenseres.data.getexpenses])
    } catch (error) {
      console.log(error.message)
    }
  }

  // Delete Transaction //

  const handleDelete = async(transactionAmount)=>{
    try {
      if(transactionAmount >= 0){
          const deleteIncome = await api.delete(`/incomes/delete-income/${editDeleteDropdown}`)
          Alltransaction()
          alert(deleteIncome.data.message)   
      }else{
        const deleteExpense = await api.delete(`/expenses/delete-expense/${editDeleteDropdown}`)
        Alltransaction()
        alert(deleteExpense.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  // Checkbox handle

  const handleCheckbox = (event) => {
    const { name, checked } = event.target
    settypeFilter({ ...typeFilter, [name]: checked })
  }

  // Months Arrow Handle

  const handleprevMonth = () => {
    setcurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handlenextMonth = () => {
    setcurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }


  const formattedMonth = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });



  // Filter Data //

 const selectMonth = currentMonth.getMonth()
 const selectYear = currentMonth.getFullYear()

  const filterData = (event) => {
    const { name, value } = event.target
    setsearchTerm({ ...searchTerm, [name]: value })
  }


  const filterTransaction = transactions.filter((item) => {
    const category = item.category.toLowerCase().includes(searchTerm.category.toLowerCase())
    const note = item.note.toLowerCase().includes(searchTerm.note.toLowerCase())

    const isIncome = Number(item.amount >= 0)
    const isExpense = Number(item.amount < 0)

    const typecheck =
      (!typeFilter.income && !typeFilter.expense) ||
      (typeFilter.income && isIncome) ||
      (typeFilter.expense && isExpense)

    const itemDate = new Date(item.date)
    const isSameMonth = itemDate.getMonth() === selectMonth && itemDate.getFullYear() === selectYear

    return category && note && typecheck && isSameMonth
  })

  const record = filterTransaction.reduce((sum, item) => sum + Number(item.amount), 0)

  useEffect(() => {
    settitle('Transaction')
    Alltransaction()
  }, [])



  return (
    <div>
      <div className='transaction'>

        <div className='transaction-filter'>

          <div className='transaction-filter-header'>
            <h1>FILTER</h1>
          </div>

          <div className='transaction-filter-inputs'>
            <label htmlFor="category">Category:</label>
            <input onChange={filterData} name='category' value={searchTerm.category} type="textarea" id="category" />

            <label htmlFor="Notes">Notes:</label>
            <input onChange={filterData} name='note' value={searchTerm.note} type="text" id="Notes" />
          </div>

          <div className='transaction-filter-checkbox'>

            <div className='type'>
              <label htmlFor="">Type</label>
            </div>

            <div className='expense'>
              <input type="checkbox" name='expense' onChange={handleCheckbox} checked={typeFilter.expense} />
              <label htmlFor="">Expenses</label>
            </div>

            <div className='income'>
              <input type="checkbox" name='income' onChange={handleCheckbox} checked={typeFilter.income} />
              <label htmlFor="">Income</label>
            </div>

          </div>

        </div>

        <div className='transaction-date'>
          <button onClick={handleprevMonth}><ChevronLeft /></button>
          <h2>{formattedMonth}</h2>
          <button onClick={handlenextMonth}><ChevronRight /></button>
        </div>

        <div className='all-transaction'>

          <div className='transaction-headers'>
            <h2>Transaction:{filterTransaction.length}</h2>
            <h2 style={{ color: record >= 0 ? "green" : "red" }}>Total:{record}</h2>
          </div>

          <hr />

          {filterTransaction.length > 0 ?
            [...filterTransaction]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction) => (

                <div className='map-transaction' key={transaction._id}>

                  <div className='map-transaction-content'>
                    <div>
                      <h3>{transaction.category}</h3>
                      <p>{transaction.account}</p>
                    </div>

                    <div className='transaction-amount-date'>
                      <p>{transaction.amount}</p>
                      <p>{transaction.date ? new Date(transaction.date).toISOString().slice(0, 10) : "No Date"}</p>
                    </div>
                  </div>

                  <div className='map-transaction-button'>
                    <button onClick={() => seteditDeleteDropdown(editDeleteDropdown === transaction._id ? null : transaction._id)}><EllipsisVertical /></button>

                    {editDeleteDropdown === transaction._id && (

                      <div className='edit-delete-dropdown-content'>
                        <ol>
                          <li onClick={()=> seteditPopup(true)}>Edit Transaction</li>
                                
                                {editPopup && transaction.amount >= 0 &&  ( <Edit_Transaction_income editpopup={seteditPopup} transactionId={editDeleteDropdown}/> )}
                                {editPopup && transaction.amount < 0 && (<Edit_Transaction_Expense editpopup={seteditPopup} transactionId={editDeleteDropdown}/>)}
                          
                          <li onClick={()=>handleDelete(transaction.amount)}>Delete Transaction</li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              ))
            :
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              No Transaction Found
            </p>
          }
        </div>
      </div>
    </div>
  )
}

export default Transaction

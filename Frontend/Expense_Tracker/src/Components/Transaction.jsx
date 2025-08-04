import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/axiosInstance';

const Transaction = () => {
  const { settitle, transactions , settransactions } = useContext(path)

  const gettransaction = async()=>{
      try {
        const res = await api.get('/incomes/get-income')
        settransactions(res.data.getincometransaction)
      } catch (error) {
        console.log(error.message)
      }
  }

  useEffect(() => {
    settitle('Transaction')
    gettransaction()
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
            <input type="textarea" id="category" />

            <label htmlFor="Notes">Notes:</label>
            <input type="text" id="Notes" />
          </div>

          <div className='transaction-filter-checkbox'>

            <div className='type'>
              <label htmlFor="">Type</label>
            </div>

            <div className='expense'>
              <input type="checkbox" />
              <label htmlFor="">Expenses</label>
            </div>

            <div className='income'>
              <input type="checkbox" />
              <label htmlFor="">Income</label>
            </div>

          </div>

        </div>

        <div className='transaction-date'>
          <ChevronLeft />
          <h2>August 2025</h2>
          <ChevronRight />
        </div>

        <div className='all-transaction'>

          {transactions.map((transaction)=>(
            <div key={transaction._id}>
                <p>{transaction.category}</p>
                <p>{transaction.amount}</p>
                <p>{transaction.account}</p>
            </div>
          ))}
            
        </div>
      </div>
    </div>
  )
}

export default Transaction

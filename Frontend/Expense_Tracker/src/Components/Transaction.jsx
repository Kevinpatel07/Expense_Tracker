import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'
import { ChevronLeft , ChevronRight } from 'lucide-react';

const Transaction = () => {
  const { settitle } = useContext(path)

  useEffect(() => {
    settitle('Transaction')
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
          <h2>box3</h2>
        </div>
      </div>
    </div>
  )
}

export default Transaction

import React, { useContext, useEffect, useState } from 'react'
import { EllipsisVertical , ChevronLeft , ChevronRight } from 'lucide-react';

import { path } from '../ContextAPI/path.context'

const Overview = () => {
  const { settitle, transactions, currencycodes, currencySymbol } = useContext(path)
  // Accounts
  const [wallet, setwallet] = useState(0)
  const [bank, setbank] = useState(0)

  // Transaction
  const [transactionPopup , settransactionPopup] = useState(false)
  const [itemShown , setitemShown] = useState(3)


  // Overview-Accounts
  const walletTransaction = () => {
    setwallet(transactions.reduce((sum, item) => item.account === 'Wallet' ? sum + (item.amount) : sum, 0))
  }

  const banktransaction = () => {
    setbank(transactions.reduce((sum, item) => item.account === 'Bank Account' ? sum + (item.amount) : sum, 0))
  }

  useEffect(() => {
    walletTransaction()
    banktransaction()
  }, [transactions])


  useEffect(() => {
    settitle('Overview')
  }, [])
  return (
    <div>
      <div className='overview'>

        <div className='overview-accounts'>
          <div>
            <h3>Accounts</h3>
          </div>

          <div className='overview-accounts-wallet'>
            <h2>Wallet</h2>
            <div>
              <h3 style={{ color: wallet >= 0 ? 'darkgreen' : 'red' }}> {currencySymbol} {wallet}</h3>
              <h3>{currencycodes} - {currencySymbol}</h3>
            </div>
          </div>

          <hr />

          <div className='overview-accounts-bank'>
            <h2>Bank account</h2>
            <div>
              <h3 style={{ color: bank >= 0 ? 'darkgreen' : 'red' }}> {currencySymbol} {bank}</h3>
              <h3>{currencycodes} - {currencySymbol}</h3>
            </div>
          </div>
        </div>




        <div className='overview-transaction'>
          <div className='overview-transaction-line'>
            <h3>Transactions</h3>
            <button onClick={()=> settransactionPopup(!transactionPopup)}><EllipsisVertical size={22} /></button>

            {transactionPopup && transactions.length > 0 && (
              <div className='dropdownTransaction'>
                <div className='dropdownTransaction-content'>

                  <div>
                    <h1>TRANSACTIONS</h1>
                  </div>

                  <div className='content-options'>
                    <p>Number of items shown:</p>
                    <select onChange={(event)=> setitemShown(event.target.value)}>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="7">7</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </div>

                  <div className='content-button'>
                    <button onClick={()=>settransactionPopup(false)}>CANCEL</button>
                    <button onClick={()=> settransactionPopup(false)}>SAVE</button>
                  </div>

                </div>  
              </div>
            )}
          </div>

          {transactions.length > 0 ?
            [...transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0 , itemShown)
              .map((item) => (
                <div key={item._id}>
                  <div className='overview-transaction-line1'>
                    <h4>{item.category}</h4>
                    <p style={{ color: item.amount >= 0 ? 'darkgreen' : "red" }}>{currencySymbol}{item.amount}</p>
                  </div>

                  <div className='overview-transaction-line2'>
                    <p>{item.account}</p>
                    <p>{item.date ? new Date(item.date).toISOString().slice(0, 10) : "No Date"}</p>
                  </div>
                </div>
              )) : <p> No Transaction Found</p>}


        </div>

        <div className='overview-lineChart'>
          <h1>box3</h1>
        </div>

        <div className='overview-cashflow'>
          <div>
            <h3>Cash Flow (Transaction)</h3>
          </div>

          <div className='cashflow-line1'>
            <div className='dates'>
              <button><ChevronLeft /></button>
              <p>August 2025</p>
              <button><ChevronRight /></button>
            </div>
            <div className='income_expense'>
              <h3>Income</h3>
              <h3>Expenses  </h3>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Overview
import React, { useContext, useEffect, useState } from 'react'
import { path } from '../ContextAPI/path.context'
import api from '../utils/axiosInstance'

const Accounts = () => {
  const { settitle , transactions } = useContext(path)
  const [walletAmount , setwalletAmount] = useState(0)
  const [bankAmount , setbankAmount] = useState(0)
  const [total , settotal] = useState(0)

  const accountWallet = ()=>{
    setwalletAmount(transactions.reduce((sum , item) => item.account == "Wallet" ? sum + (item.amount) : sum , 0))
  }

  const accountBank = ()=>{
    setbankAmount(transactions.reduce((sum , item)=> item.account === 'Bank Account' ? sum + (item.amount) : sum , 0))
  }

  
  const totalAmount = ()=>{
    settotal(transactions.reduce((sum , item)=> sum + (item.amount) , 0))
  }

  useEffect(() => {
    settitle("Accounts")
  }, [])

  useEffect(()=>{
    accountWallet()
    accountBank()
    totalAmount()
  },[transactions])


  return (
    <div>
      <div className='accounts'>
        <div className='accounts-wallet'>
          <h2>Wallet</h2>
          <h2 style={{color:walletAmount>=0? "green" : "red"}}>{walletAmount}</h2>
        </div>
        <div className='accounts-bank'>
          <h2>Bank Account</h2>
          <h2 style={{color:bankAmount>=0? "green" : "red"}} >{bankAmount}</h2>
        </div>
        <div className='accounts-total'>
            <h2>Total:</h2>
            <h2 style={{color:total>=0? "green" : "red"}}>{total}</h2>
        </div>
      </div>
    </div>
  )
}

export default Accounts

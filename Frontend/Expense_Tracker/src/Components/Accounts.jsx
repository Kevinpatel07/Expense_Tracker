import React, { useContext, useEffect } from 'react'
import { path } from '../ContextAPI/path.context'

const Accounts = () => {
  const { settitle } = useContext(path)

  useEffect(() => {
    settitle("Accounts")
  }, [])
  return (
    <div>
      <div className='accounts'>
        <div className='accounts-wallet'>
          <h2>Wallet</h2>
          <h2>Amount</h2>
        </div>
        <div className='accounts-bank'>
          <h2>Bank Account</h2>
          <h2>Amount</h2>
        </div>
        <div className='accounts-total'>
            <h2>Total : Amount</h2>
        </div>
      </div>
    </div>
  )
}

export default Accounts

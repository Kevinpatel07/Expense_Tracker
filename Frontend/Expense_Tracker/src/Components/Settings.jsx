import React, { useContext, useEffect, useState } from 'react'
import { path } from '../ContextAPI/path.context'
import currencyCodes from 'currency-codes'
import getSymbolFromCurrency from 'currency-symbol-map'

const Settings = () => {
  const {settitle , setcurrencySymbol , currencycodes , setcurrencycodes}  = useContext(path)


  const handleCurrencyChange = (event)=>{
    setcurrencycodes(event.target.value)
  }

  const handleSavebutton = ()=>{
    const symbol = getSymbolFromCurrency(currencycodes)
    setcurrencySymbol(symbol)

    localStorage.setItem('Currencycode' , currencycodes)
    localStorage.setItem('Currencysymbol' , symbol)

    alert("Your currency saved successfully")
  }

  useEffect(()=>{
    settitle("Settings")  
  },[])
  return (
    <div className='settings'>
        <div className='settings-feedback'>
          <h3>Feedback & Support</h3>
          <p>If you have any question, contact our customer service at support.web@spendy.it</p>
        </div>

       <hr />

       <div className='settings-currency'>
        <h3>Currency:</h3>
        <select  onChange={handleCurrencyChange}>
          {currencyCodes.codes().map((codes)=>
               <option key={codes}  value={codes}>{codes}</option>     
          )}
        </select>
        
        <button onClick={handleSavebutton}>SAVE</button>
       </div>
    </div>
  )
}

export default Settings

import React, { useContext, useEffect, useState } from 'react'
import { path } from '../ContextAPI/path.context'

const Charts = () => {
  const { settitle , transactions } = useContext(path)
  const [transactionCategories , settransactionCategories] = useState({income:false, expense:false,both:false})
  const [date_account , setdate_account] = useState({from:"" , to:"" , account:""})
  const [charts , setcharts] = useState({bar:false , pie:false})


  // HANDLE DATE AND ACCOUNT //

  const handledate_account = (event)=>{
    const {name , value}  = event.target
    setdate_account({...date_account , [name]:value})
  }

  // HANDLE CHECKBOX //

  const handleCheckbox  = (event)=>{
    const {name , checked} = event.target
    settransactionCategories({...transactionCategories , [name]:checked})
  }

  // HANDLE CHARTS //

  const handleCharts = (event)=>{
    const {name , checked} = event.target
    setcharts({...charts , [name]:checked})
  }



  useEffect(() => {
    settitle("Charts")
  }, [])
  return (
    <div className='charts'>

      <div className='charts-content'>

        <div className='charts-content-1'>
          <p>Show all categories of:</p>

          <div className='charts-radio'>
            <input type="checkbox" name='expense'  onChange={handleCheckbox} checked={transactionCategories.expense} />
            <p>Expenses</p>
          </div>

          <div className='charts-radio'>
            <input type="checkbox" onChange={handleCheckbox} name='income' checked={transactionCategories.income} />
            <p>Income</p>
          </div>

          <div className='charts-radio'>
            <input type="checkbox" onChange={handleCheckbox} name='both' checked={transactionCategories.both} />
            <p>Both</p>
          </div>
        </div>

        <div className='charts-content-2'>

          <div className='charts-content-2-from-to'>
            <p>From:</p>
            <p>To:</p>
          </div>

          <div className='charts-content-2-date'>
            <input type="date" onChange={handledate_account} name='from' value={date_account.from} />
            <input type="date" onChange={handledate_account} name='to'  value={date_account.to}/>
          </div>

        </div>

        <div className='charts-content-3'>
          <p>Accounts:</p>
          <select onChange={handledate_account} name='account'  value={date_account.account}>
            <option value="">Select</option>
            <option value="Wallet">Wallet</option>
            <option value="Bank Account">Bank Account</option>
          </select>
        </div>

        <div className='charts-content-4'>
          <p>Chart Type: </p>

          <div>
            <div className='bar-chart'>
                <input type="checkbox" name='bar' onChange={handleCharts} checked={charts.bar} />
                <p>Bar chart</p>
            </div>

            <div className='pie-chart'>
              <input type="checkbox" name='pie' onChange={handleCharts} checked={charts.pie}/>
              <p>Pie chart</p>
            </div>
          </div>

        </div>

        <div className='charts-content-5'>
          <button>SHOW REPORT</button>
        </div>
      </div>



      
    </div>
  )
}

export default Charts








import React, { useContext, useEffect, useState } from 'react'
import api from '../utils/axiosInstance';
import { EllipsisVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins, scales } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


import { path } from '../ContextAPI/path.context'

const Overview = () => {
  const { settitle, transactions, currencycodes, currencySymbol } = useContext(path)
  // Accounts
  const [wallet, setwallet] = useState(0)
  const [bank, setbank] = useState(0)

  // Transaction
  const [transactionPopup, settransactionPopup] = useState(false)
  const [itemShown, setitemShown] = useState(3)
  const [tempitemShown , settempitemShown] = useState(itemShown)

  // Cashflow
  const [dates, setdates] = useState(new Date())

  // Line Charts 
  const [barChart, setbarChart] = useState({ labels: [], datasets: [] })


  // Overview-Accounts
  const walletTransaction = () => {
    setwallet(transactions.reduce((sum, item) => item.account === 'Wallet' ? sum + (item.amount) : sum, 0))
  }

  const banktransaction = () => {
    setbank(transactions.reduce((sum, item) => item.account === 'Bank Account' ? sum + (item.amount) : sum, 0))
  }

  // Cashflow

  const handleleftarrow = () => {
    setdates((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handlerightarrow = () => {
    setdates((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const formattedMonth = dates.toLocaleString('default', {
    month: "long",
    year: 'numeric'
  })

  const selectMonth = dates.getMonth()
  const selectYear = dates.getFullYear()
  const filteredTransaction = transactions.filter((item) => {
    const itemDate = new Date(item.date)
    const isSamemonth = itemDate.getMonth() === selectMonth && itemDate.getFullYear() === selectYear
    return isSamemonth
  })


  // Bar Chart 

  const barchart = async () => {
    const bothTransaction = await api.get(`/expenses/both-chart-transaction`)
    const expense = (Math.abs(bothTransaction.data.expense.reduce((sum, item) => (sum + (item.amount)), 0)))
    const income = (bothTransaction.data.income.reduce((sum, item) => sum + (item.amount), 0))

    setbarChart({
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: [
            "green", "red"
          ]
        }
      ]
    })
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Transactions Report'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: barChart?.datasets?.length > 0 && barChart.datasets[0]?.data?.length > 0 ?
          Math.max(...barChart.datasets[0].data) * 1.1
          : undefined
      }
    }
  };


  useEffect(() => {
    walletTransaction()
    banktransaction()
    barchart()
  }, [transactions])

  const income = filteredTransaction.reduce((sum, item) => item.amount >= 0 ? sum + (item.amount) : sum, 0)
  const expense = filteredTransaction.reduce((sum, item) => item.amount < 0 ? sum + (item.amount) : sum, 0)

  const incomeCount = filteredTransaction.filter((item) => item.amount >= 0).length
  const expenseCount = filteredTransaction.filter((item) => item.amount < 0).length

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

        <div className='overview-cashflow'>
          <div>
            <h3>Cash Flow (Transaction)</h3>
          </div>

          <table className='cashflow-table'>
            <thead>
              <tr >
                <th>
                  <div className='dates'>
                    <button onClick={handleleftarrow}><ChevronLeft /></button>
                    <p>{formattedMonth}</p>
                    <button onClick={handlerightarrow}><ChevronRight /></button>
                  </div>
                </th>
                <th>Income</th>
                <th>Expenses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'start' }}>Total</td>
                <td>{currencySymbol} {income}</td>
                <td>{currencySymbol} {expense}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'start' }}>Transaction</td>
                <td>{incomeCount}</td>
                <td>{expenseCount}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'start' }} >Average(Day)</td>
                <td>{currencySymbol} {( income / new Date(selectYear, selectMonth + 1, 0).getDate()).toFixed(2)}</td>
                <td>{currencySymbol} {( expense / new Date(selectYear, selectMonth + 1, 0).getDate()).toFixed(2)}</td>

              </tr>
              <tr>
                <td style={{ textAlign: 'start', borderBottom: "1px solid lightgray" }} >Average (Transactions)</td>
                <td style={{ borderBottom: "1px solid lightgray" }}>{currencySymbol} {(income / incomeCount).toFixed(2)}</td>
                <td style={{ borderBottom: "1px solid lightgray" }}>{currencySymbol} {(expense / expenseCount).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className='cashflow-total'>
            <p style={{color: (income - Math.abs(Number(expense))) >= 0 ? 'darkgreen' : 'red' }}>Total:   {currencySymbol}{income - Math.abs(Number(expense))}</p>
          </div>
        </div>

        
         <div className='overview-BarChart'>
          <Bar data={barChart} options={barOptions} />
        </div>

        <div className='overview-transaction'>
          <div className='overview-transaction-line'>
            <h3>Transactions</h3>
            <button onClick={() => settransactionPopup(!transactionPopup)}><EllipsisVertical size={22} /></button>

            {transactionPopup && transactions.length > 0 && (
              <div className='dropdownTransaction'>
                <div className='dropdownTransaction-content'>

                  <div>
                    <h1>TRANSACTIONS</h1>
                  </div>

                  <div className='content-options'>
                    <p>Number of items shown:</p>
                    <select value={tempitemShown} onChange={(event) => settempitemShown(event.target.value)}>
                      <option value=""  disabled>Select</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="7">7</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </div>

                  <div className='content-button'>
                    <button onClick={() => settransactionPopup(false)}>CANCEL</button>
                    <button onClick={() => (setitemShown(tempitemShown) ,  settransactionPopup(false))}>SAVE</button>
                  </div>

                </div>
              </div>
            )}
          </div>

          {transactions.length > 0 ?
            [...transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, itemShown)
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

      </div>


    </div>
  )
}

export default Overview
import React, { useContext, useEffect, useState } from 'react'
import { path } from '../ContextAPI/path.context'
import api from '../utils/axiosInstance';
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)


const Charts = () => {
  const { settitle} = useContext(path)
  const [transactionCategories, settransactionCategories] = useState("")
  const [date_account, setdate_account] = useState({ from: "", to: "", account: "" })
  const [charts, setcharts] = useState("")
  const [chartdata, setchartdata] = useState({ labels: [], datasets: [] })
  const [chartspopUp, setchartspopUp] = useState(false)


  // HANDLE DATE AND ACCOUNT // 

  const handledate_account = (event) => {
    const { name, value } = event.target
    setdate_account({ ...date_account, [name]: value })
  }

  // HANDLE SHOW REPORT //

  const groupBycategory = (filtertransaction) => {
    const group = {}

    filtertransaction.forEach((item) => {
      const category = item.category
      const amount = Math.abs(Number(item.amount))

      if (group[category]) {
        group[category] += amount
      } else {
        group[category] = amount
      }
    })

    return {
      labels: Object.keys(group),
      amount: Object.values(group)
    }
  }

  const handleShowReport = async () => {

    if (transactionCategories === 'expense') {
      setchartspopUp(true)
      const expense = await api.get(`/expenses/chart-transaction?from=${date_account.from}&to=${date_account.to}&account=${date_account.account}`)
      const { labels, amount } = groupBycategory(expense.data.expense || [])
      setchartdata({
        labels,
        datasets: [
          {
            data: amount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)"
            ]
          }
        ]
      })
    } else if (transactionCategories === 'income') {
      setchartspopUp(true)
      const income = await api.get(`/incomes/chart-transaction?from=${date_account.from}&to=${date_account.to}&account=${date_account.account}`)
      const { labels, amount } = groupBycategory(income.data.filterincomedata || [])
      setchartdata({
        labels,
        datasets: [
          {
            data: amount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)"
            ]
          }
        ]
      })
    } else if(transactionCategories === 'both'){
      setchartspopUp(true)
      const bothTransaction = await api.get(`/expenses/both-chart-transaction?from=${date_account.from}&to=${date_account.to}&account=${date_account.account}`)
      const expense = Math.abs(bothTransaction.data.expense.reduce((sum , item) => (sum + (item.amount)) , 0))
      const income = bothTransaction.data.income.reduce((sum,item)=> sum + (item.amount),0)

      setchartdata({
        labels : ["Income" , "Expense"],
        datasets:[
          {
            data:[income , expense],
            backgroundColor: [
             "green" , "red"
            ]
          }
        ]
      })
    }
  }


  // OPTIONS

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display : false},
      title: {
        display: true,
        text: 'Transactions Report' 
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: chartdata?.datasets?.length > 0 && chartdata.datasets[0]?.data?.length > 0 ?
          Math.max(...chartdata.datasets[0].data) * 1.1
          : undefined
      }
    }
  };

  const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Transactions Report'
    }
  }
};



  useEffect(() => {
    settitle("Charts")
  }, [])
  return (
    <div className='charts'>

      <div className='charts-content'>

        <div className='charts-content-1'>
          <p>Show all categories of:</p>

          <div className='charts-radio'>
            <input type="radio" name='category' value='expense' onChange={(event) => settransactionCategories(event.target.value)} checked={transactionCategories === 'expense'} />
            <p>Expenses</p>
          </div>

          <div className='charts-radio'>
            <input type="radio" name='category' value='income' onChange={(event) => settransactionCategories(event.target.value)} checked={transactionCategories === 'income'} />
            <p>Income</p>
          </div>

          <div className='charts-radio'>
            <input type="radio" name='category' value='both' onChange={(event) => settransactionCategories(event.target.value)} checked={transactionCategories === 'both'} />
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
            <input type="date" onChange={handledate_account} name='to' value={date_account.to} />
          </div>

        </div>

        <div className='charts-content-3'>
          <p>Accounts:</p>
          <select onChange={handledate_account} name='account' value={date_account.account}>
            <option value="">Select</option>
            <option value="Wallet">Wallet</option>
            <option value="Bank Account">Bank Account</option>
          </select>
        </div>

        <div className='charts-content-4'>
          <p>Chart Type: </p>

          <div>
            <div className='bar-chart'>
              <input type="radio" name='chart' value='bar' onChange={(event) => setcharts(event.target.value)} checked={charts === 'bar'} />
              <p>Bar chart</p>
            </div>

            <div className='pie-chart'>
              <input type="radio" name='chart' value='pie' onChange={(event) => setcharts(event.target.value)} checked={charts === 'pie'} />
              <p>Pie chart</p>
            </div>
          </div>

        </div>

        <div className='charts-content-5'>
          <button onClick={handleShowReport}>SHOW REPORT</button>
        </div>
      </div>

      <div>
        {charts === 'bar' && chartspopUp && chartdata.labels.length > 0 && (
          <div className='display-chart'>
            <Bar data={chartdata} options={barOptions} />
          </div>
        )
        }

        {charts === 'pie' && chartspopUp && chartdata.labels.length > 0 && (
          <div className='display-chart'>
            <Pie data={chartdata} options={pieOptions} />
          </div>
        )
        }
      </div>





    </div>
  )
}

export default Charts








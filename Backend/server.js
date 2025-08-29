const express = require('express')
const connectDB = require('./config/expense_config')
const App = express()
const cors = require('cors')
const userRouter = require('./routes/user.router')
const incomeRouter = require('./routes/Income.router')
const expenseRouter = require('./routes/Expense.router')
require("dotenv").config()

connectDB()

const corsOptions = {
  origin: 'https://expense-tracker-web-seven.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

App.use(cors(corsOptions));
App.options('*', cors(corsOptions)); 

App.use(express.json())

App.use('/api/users' , userRouter)
App.use('/api/incomes' , incomeRouter)
App.use('/api/expenses' , expenseRouter)

const PORT = process.env.PORT || 7390;
App.listen(PORT , ()=>{
    console.log(`Server is working on http://localhost:${PORT}`)
})
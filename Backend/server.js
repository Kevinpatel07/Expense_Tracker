const express = require('express')
const connectDB = require('./config/expense_config')
const App = express()
const cors = require('cors')
const userRouter = require('./routes/user.router')
const incomeRouter = require('./routes/Income.router')
const expenseRouter = require('./routes/Expense.router')
require("dotenv").config()

connectDB()
App.use(cors());
App.use(express.json())

App.use('/api/users' , userRouter)
App.use('/api/incomes' , incomeRouter)
App.use('/api/expenses' , expenseRouter)

PORT = 7390
App.listen(PORT , ()=>{
    console.log(`Server is working on http://localhost:${PORT}`)
})
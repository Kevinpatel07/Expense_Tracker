const express = require('express')
const connectDB = require('./config/expense_config')
const App = express()
const cors = require('cors')
const userRouter = require('./routes/user.router')
const incomeRouter = require('./routes/income.router')
const expenseRouter  = require('./routes/expense.router')
require("dotenv").config()

connectDB()

const corsOptions = {
  origin: 'https://expense-tracker-web-seven.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

App.use(cors(corsOptions));
App.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
    res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
    res.sendStatus(204); // No Content
  } else {
    next();
  }
});

App.use(express.json())

App.use('/api/users' , userRouter)
App.use('/api/incomes' , incomeRouter)
App.use('/api/expenses' , expenseRouter)

const PORTT = process.env.PORT || 7390;
App.listen(PORTT , ()=>{
    console.log(`Server is working on http://localhost:${PORTT}`)
})
const express = require('express')
const connectDB = require('./config/expense_config')
const App = express()
const cors = require('cors')
const userRouter = require('./routes/user.router')
require("dotenv").config()

connectDB()
App.use(cors());
App.use(express.json())

App.use('/api' , userRouter)

PORT = 7390
App.listen(PORT , ()=>{
    console.log(`Server is working on http://localhost:${PORT}`)
})
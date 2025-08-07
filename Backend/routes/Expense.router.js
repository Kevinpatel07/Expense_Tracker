const express = require('express')
const Expensemodel = require('../models/Expense.model')
const AuthMiddleware = require('../middleware/auth_middleware')
const expenseRouter = express.Router()

expenseRouter.post('/add-expenses' ,AuthMiddleware ,  async(req,res)=>{
    try {
        const addexpenses = new Expensemodel({...req.body , userId:req.user})
        await addexpenses.save()
        res.status(201).json({addexpenses})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Add-Expenses Error"})
    }
})

expenseRouter.get('/get-expenses' , AuthMiddleware , async(req , res)=>{
    try {
        const getexpenses = await Expensemodel.find({userId : req.user})

         if(getexpenses.length == 0){
            return res.status(404).json({message:"No Transaction Found"})
        }

        res.status(200).json({getexpenses})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Get-Expenses Error"})
    }
})

module.exports = expenseRouter
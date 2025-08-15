const express = require('express')
const Expensemodel = require('../models/Expense.model')
const AuthMiddleware = require('../middleware/auth_middleware')
const Incomemodel = require('../models/Income.model')
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
        res.status(200).json({getexpenses})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Get-Expenses Error"})
    }
})


expenseRouter.patch('/edit-expense/:id' , AuthMiddleware , async(req,res)=>{
    try {
        const {id} = req.params

        const editExpenses = await Expensemodel.findById(id)

        if(!editExpenses){
            return res.status(404).json({message:"No Transaction Found"})
        }

        const edit = await Expensemodel.findByIdAndUpdate(id , req.body , {new:true})
        res.status(201).json({edit})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Edit-Expenses Error"})
    }
})

expenseRouter.delete('/delete-expense/:id' , AuthMiddleware , async(req,res)=>{
    try {
        const {id} = req.params

        const deletetransaction = await Expensemodel.findById(id)

        if(!deletetransaction){
            return res.status(500).json({message:"No Transaction Found"})
        }

        await Expensemodel.findByIdAndDelete(id)
        res.status(200).json({message:" Expense Transaction Deleted"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Delete-Expenses Error"})
    }
})

expenseRouter.get('/chart-transaction' , AuthMiddleware , async(req,res)=>{
    try {

        const {from ,  to ,  account} = req.query

        const filterexpense = {}

        if(from && to){
            filterexpense.date = {$gte: new Date(from) , $lte: new Date(to)}
        }

        if(account){
            filterexpense.account = account
        }
        
        const expense = await Expensemodel.find(filterexpense)
        res.status(200).json({expense}) 
          
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Charts Expense Error"})    
    }
})

expenseRouter.get('/both-chart-transaction' , AuthMiddleware , async(req,res)=>{
    try {

        const {from , to , account} = req.query

        const filterbothtransaction = {}

        if(from && to){
            filterbothtransaction.date = {$gte: new Date(from) , $lte: new Date(to)}
        }

        if(account){
            filterbothtransaction.account = account
        }

        const expense = await Expensemodel.find(filterbothtransaction)
        const income = await Incomemodel.find(filterbothtransaction)

        res.status(200).json({expense , income})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:" Both Charts Error"}) 
    }
})


module.exports = expenseRouter
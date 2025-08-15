const express = require('express')
const Incomemodel = require('../models/Income.model')
const AuthMiddleware = require('../middleware/auth_middleware')
const incomeRouter = express.Router()


incomeRouter.post('/add-income', AuthMiddleware, async (req, res) => {
    try {
        const addIncome = new Incomemodel({ ...req.body, userId: req.user })
        await addIncome.save()
        res.status(201).json({ addIncome })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Add-income Error' })
    }
})

incomeRouter.get('/get-income', AuthMiddleware, async (req, res) => {
    try {
        const getincometransaction = await Incomemodel.find({userId:req.user})
        
        res.status(200).json({ getincometransaction })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Get-income error" })
    }
})

incomeRouter.patch('/edit-income/:id' , AuthMiddleware , async(req,res)=>{
    try {
         const {id} =  req.params
        const incomeTransaction = await Incomemodel.findById(id)

        if(!incomeTransaction){
            return res.status(404).json({message:"No Transaction Found"})
        }

        const edit = await Incomemodel.findByIdAndUpdate(id , req.body , {new:true})
        res.status(201).json({edit})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "edit-income error" })
    }
})

incomeRouter.delete('/delete-income/:id' , AuthMiddleware , async(req,res)=>{
    try {
        const {id} = req.params

        const deletetransaction = await Incomemodel.findById(id)

        if(!deletetransaction){
            return res.status(404).json({message:"No Transaction Found"})
        }

         await Incomemodel.findByIdAndDelete(id)
        res.status(200).json({message:"Income Transaction Deleted"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Delete-income error" })
    }
})

incomeRouter.get('/chart-transaction' , AuthMiddleware , async(req,res)=>{
    try {
        const {from , to , account} = req.query

        const filterdata = {}
        if(from && to){
            filterdata.date = {$gte: new Date(from) , $lte: new Date(to)}
        }

        if(account){
            filterdata.account = account
        }

        const filterincomedata = await Incomemodel.find(filterdata)
        res.status(200).json({filterincomedata})
    } catch (error) {
        console.log(error.message)
         res.status(500).json({ message: "chart-income error" })
    }
})

module.exports = incomeRouter
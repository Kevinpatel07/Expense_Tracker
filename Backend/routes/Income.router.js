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
        if(getincometransaction.length == 0){
            return res.status(404).json({message:"No Transaction Found"})
        }
        
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

module.exports = incomeRouter
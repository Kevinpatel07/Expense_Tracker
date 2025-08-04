const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId , ref:"users" , required:true},
    category:{type:String , enum:['Financial Income' ,'Salary', 'Pension', 'Pocket Money', 'Other Income'] , required:true},
    amount:{type:Number , required:true},
    account:{type:String , enum:['Wallet' , 'Bank Account'] , required:true},
    date:{type:Date , default: Date.now},
    time:{type:String  , default: ()=> { 
        const now = new Date();
        return now.toTimeString().slice(0,5)
    }},
    note:{type:String}
}
,{timestamps:true})

const Incomemodel = mongoose.model('incomes' , incomeSchema)

module.exports = Incomemodel
const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId , ref:"users" , required:true},
    category:{type:String , enum:['Food/Drinks' , 'Shopping' , 'Transportation' , 'Entertainment' , 'Home' , 'Family' , 'Health/Sport' , 'Pets' , 'Travel' , 'Other Expenses'] , required:true},
    amount:{type:Number , required:true},
    account:{type:String , enum:['Wallet' , 'Bank Account'] , required:true},
    date:{type:Date , default: Date.now},
    time:{type:String , default: ()=> { 
        const now = new Date();
        return now.toTimeString().slice(0,5)
    }},
    note:{type:String}
},
 {timestamps:true}
)

const Expensemodel = mongoose.model('expenses' , expenseSchema)

module.exports = Expensemodel
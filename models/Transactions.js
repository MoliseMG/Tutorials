var mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    token:{
        type: String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
    },
    meterno:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
    },
    phone_number:{
        type:String,
        trim:true,
        required:true
    }
});

const Transactions = module.exports = mongoose.model('Transactions',TransactionSchema);
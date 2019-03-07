var mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    phone_number:{
        type: String,
        required:true,
        trim:true
    },
    metername:{
        type:String,
        required:true,
    },
    meterno:{
        type:String,
        required:true,
        trim:true
    }
});

const Transactions = module.exports = mongoose.model('Meters',TransactionSchema);
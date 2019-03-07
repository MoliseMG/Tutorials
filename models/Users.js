var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_number:{
        type:String,
        unique: true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
});

const Users = module.exports = mongoose.model('Users',UserSchema);
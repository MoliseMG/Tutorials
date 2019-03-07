var express = require('express');
var router = express.Router();
const bcrpt = require('bcrypt');
var user = require('../models/Users');
var transaction = require('../models/Transactions');
var meter = require('../models/Meters');

//U S E R S
//login with email and password
router.post('/login',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log('login');
    user.findOne({email, password},function(err,user){
            if(err || !user){
                return res.json({result:'failed login'});
            }else{
                return res.json(user);
            }
    }).pretty;
});

//register user
router.post('/register',(req,res,next)=>{
    //add data to repository
    var newUser = {
    firstname : req.body.firstName,
    lastname : req.body.lastName,
    phone_number : req.body.phoneNumber,
    password : req.body.password,
    email : req.body.email,   
    }

    user.create(newUser,(err,entry)=>{
        if(err){
            return res.json({result:'failed'});
        }else{
            return res.json(entry);
        }
    });
});

//remove user
router.delete('/users',(req,res,next)=>{
    //remove data from repository
});



// T R A S A C T I O N S
//Get transactions by user 
router.get('/transaction/:phone_number',(req,res)=>{
    var phone_number = req.param('phone_number');

    transaction.find({phone_number:phone_number},function(err,trans){
            if(err || trans.length ==0){
                return res.json({result:'failed'});
            }else{
                console.log(trans);
                return res.jsonp({transactions:trans});
            }
    });
});

//add transactions
router.post('/transaction',(req,res,next)=>{
    now = new Date();
    //tkns = generateTokens();
    var transact = {
    token : req.body.token,
    amount : req.body.amount,
    meterno : req.body.meterno,
    phone_number : req.body.phone_number,
    date : now
    }

    transaction.create(transact,(err,entry)=>{
        if(err){
            return res.json({result:'failed'});
        }else{
            return res.json(entry);
        }
    });
});

//edit transactions
router.put('/transaction',(req,res,next)=>{
    //add data to repository
    var newUser = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    phone_number : req.body.phone_number,
    password : req.body.password,
    balance : 100
    }

    user.create(newUser,(err,entry)=>{
        if(err){
            return res.json({result:'failed'});
        }else{
            return res.json(entry);
        }
    });
});

//delete transaction
router.delete('/transaction',(req,res,next)=>{
    //remove data from repository
});

//User Meters
//add transactions
router.post('/meter',(req,res,next)=>{
    now = new Date();
    //tkns = generateTokens();
    var meterreq = {
    meterno : req.body.meterno,
    metername : req.body.metername,
    phone_number : req.body.phone_number,
    }

    meter.create(meterreq,(err,entry)=>{
        if(err){
            return res.json({result:'failed'});
        }else{
            return res.json(entry);
        }
    });
});

router.get('/transaction/:phone_number',(req,res)=>{
    var phone_number = req.param('phone_number');

    meter.find({phone_number:phone_number},function(err,m){
            if(err || m.length ==0){
                return res.json({result:'failed'});
            }else{
                console.log(m);
                return res.jsonp({transactions:m});
            }
    });
});

module.exports = router;
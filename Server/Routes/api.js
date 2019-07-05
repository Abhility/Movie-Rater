const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
//DB Connection
const database = 'mongodb+srv://admin:admin@cluster0-oueoz.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(database, { useNewUrlParser: true, dbName: 'movie-rater' },err => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to database');
    }
});


function generateToken(data){
   const token = jwt.sign({subject : data._id},'secretkey');
   return token;
}

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if(token == 'null'){
        return res.status(401).send('Unauthorized request');
    }
    jwt.verify(token,'setup-key',(err,data) => {
          if(err){
            return res.status(401).send('Unauthorized request');
          }
   });
    next();
}

function verifyLoginToken(req,res,next){
    if(!req.headers.usertoken){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.usertoken;
    if(token == 'null'){
        return res.status(401).send('Unauthorized request');
    }
    jwt.verify(token,'secretkey',(err,data) => {
        if(err){
          return res.status(401).send('Unauthorized request');
        }
    });
    next();
}

//API routes
router.post('/register',verifyToken,(req,res) => {
    const userData = req.body;
    console.log(userData);
    const user = new User(userData);
    user.save((err,data) =>{
        if(err){
          console.log(err);
          return res.status(500).send(err);
        }
        else{
            return res.status(200).send({"message": "successfully registerd"});
        }
    });
})

router.post('/login',verifyToken,(req,res) => {
    const userData = req.body;
    User.findOne({email: userData.email},(err,data) =>{
        if(err){
            return res.status(500).json({"error":err});
        }
        if(data){
             if(data.password!=userData.password){
                return res.status(403).json({message: 'Incorrect Password'});
             }
             else{
                return res.status(200).send({usertoken : generateToken(data)});
             }
        }
        else{
            return res.status(404).json({message: 'Email not found'});
        }
    })
})

router.get('/setup',(req,res) => {
    const token = jwt.sign({subject: 'movie-rater'},'setup-key');
    return res.status(200).send({token: token});
});

router.get('/users',verifyToken,verifyLoginToken,(req,res) => {
    User.find({},(err,data) =>{
        if(err){
           return res.status(500).send(err);
        }
         return res.status(200).send(data);
    })
})


module.exports = router;


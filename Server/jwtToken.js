const jwt = require('jsonwebtoken');

function generateToken(data){
    const token = jwt.sign({subject : data._id},process.env.USER_KEY);
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
         if(data){
             req.userId = data.subject;
             console.log(data.subject);
         }
     });
     next();
 }

 module.exports.generateToken = generateToken;
 module.exports.verifyLoginToken = verifyLoginToken;
 module.exports.verifyToken = verifyToken;
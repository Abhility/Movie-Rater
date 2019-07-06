const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {verifyLoginToken,verifyToken} = require('../jwtToken');


router.post('/addtowatchlist',verifyToken,verifyLoginToken,(req,res) =>{
     const movieId = req.body.movieId;
     res.status(200).send('added'+movieId);
});

router.delete('/removefromwatchlist/:movieId',verifyToken,verifyLoginToken,(req,res) =>{
    const movieId = req.params.movieId;
    res.status(200).send('removed'+movieId);
});

module.exports = router;
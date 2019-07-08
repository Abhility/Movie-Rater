const express = require('express');
const router = express.Router();
const { verifyLoginToken, verifyToken } = require('../jwtToken');
const Watchlist = require('../models/profile');

router.post('/addtowatchlist', verifyToken, verifyLoginToken, (req, res) => {
  const movieId = req.body.movieId;
  const userId = req.userId;
  //const watchlist = new Watchlist(); 
  Watchlist.findOneAndUpdate({ userId: userId }, { $push: { list: movieId } }, { new: true, useFindAndModify: false, writeConcern: { w: "majority", wtimeout: 5000 } }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(data);
      res.status(200).send(data);
    }
  })

});

router.delete('/removefromwatchlist/:movieId', verifyToken, verifyLoginToken, (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.userId;
  Watchlist.findOneAndUpdate({ userId: userId }, { $pull: { list: movieId } }, { new: true, useFindAndModify: false, writeConcern: { w: "majority", wtimeout: 5000 } }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(data);
      res.status(200).send(data);
    }
  })
});

router.get('/getwatchlist', verifyToken, verifyLoginToken, (req, res) => {
  Watchlist.findOne({ userId: req.userId }, { list: true }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(data);
      res.status(200).send(data);
    }
  });
});


module.exports = router;
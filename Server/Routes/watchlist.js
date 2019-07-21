const express = require("express");
const router = express.Router();
const { verifyLoginToken, verifyToken } = require("../jwtToken");
const Watchlist = require("../models/profile");
const fetch = require("node-fetch");
router.post("/addtowatchlist", verifyToken, verifyLoginToken, (req, res) => {
  const movieId = req.body.movieId;
  const userId = req.userId;
  //const watchlist = new Watchlist();
  Watchlist.findOneAndUpdate(
    { userId: userId },
    { $push: { list: movieId } },
    {
      new: true,
      useFindAndModify: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
    },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.delete(
  "/removefromwatchlist/:movieId",
  verifyToken,
  verifyLoginToken,
  (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.userId;
    Watchlist.findOneAndUpdate(
      { userId: userId },
      { $pull: { list: movieId } },
      {
        new: true,
        useFindAndModify: false,
        writeConcern: { w: "majority", wtimeout: 5000 }
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  }
);

async function getWatchlist(userId) {
  let watchlist = [];
  await Watchlist.findOne({ userId }, { list: true }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      if (data == null) {
        watchlist = null;
      } else {
        watchlist = data.list;
      }
    }
  });
  return watchlist;
}

async function createWatchlist(watchlist) {
  let movies = [];
  for (let i = 0; i < watchlist.length; i++) {
    await fetch(
      `https://api.themoviedb.org/3/movie/${watchlist[i]}?api_key=${
        process.env.API_KEY
      }`
    )
      .then(response => response.json())
      .then(result => {
        movies.push(result);
      })
      .catch(err => console.log(err));
  }
  movie = movies;
  return movies;
}

router.get("/getwatchlist", verifyToken, verifyLoginToken, async (req, res) => {
  let watchlist = await getWatchlist(req.userId);
  if (watchlist == null) {
    res.status(200).send({ present: false, data: null });
    console.log({ present: false, data: null });
    res.end();
  } else {
    let movie = await createWatchlist(watchlist);
    res.status(200).send({ present: true, data: movie });
    console.log({ present: true, data: movie });
    res.end();
  }
});
module.exports = router;

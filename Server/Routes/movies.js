const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/movie-rater/search', (req, res) => {
    console.log('movie rater');
    console.log(req.headers);
    var name = req.headers.name;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd8fecae6979571c97966e56c38b6a8b&language=en-US&query=${name}`).then(response => response.json())
    .then(result =>{
    console.log(result);
    res.status(200).send(result.results);
    }).
    catch(err => console.log(err))
});

module.exports = router;
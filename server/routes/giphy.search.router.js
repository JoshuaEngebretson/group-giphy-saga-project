const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();



router.get('/', (req, res) => {
    let rating = req.query.rating
    const searchQuery = req.query.searchQuery

    // Set up initial search query, this will provide gifs that;
    // - Have a "tag" of ${searchQuery}
    // - Have a "rating" of ${rating}
    // - Limit us to 10 results
    const searchGifyUrl = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchQuery}&rating=${rating}&limit=10`

  axios.get(searchGifyUrl)
    .then((response) => {
      const resultingGifs = response.data.data;
      console.log('\n\n\nresultingGifs within get route from GIPHY:\n\n\n', resultingGifs);
      let gifImageArray = []
      let newGif = {}
      resultingGifs.map(gif => {
        newGif.title = gif.title
        newGif.image = gif.images.original.url
        gifImageArray.push(newGif)
      })
      console.log('\n\n\ngifImageArray populated:', gifImageArray);
      // Send okay until I know what the data looks like.
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('GET serachGifyUrl error:', err);
      res.sendStatus(500);
    })
})

module.exports = router;
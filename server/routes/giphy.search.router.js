const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();



router.get('/', (req, res) => {
    let rating = req.query.rating
    const searchQuery = req.query.searchQuery

    // Set up initial search query, this will provide gifs that;
    // - Have a "q" of ${searchQuery}
    // - Have a "rating" of ${rating}
    // - Limit us to 10 results
    const searchGifyUrl = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchQuery}&rating=${rating}&limit=10`

  axios.get(searchGifyUrl)
    .then((response) => {
      const resultingGifs = response.data.data;
      let gifImages = []
      // Go through resulting Gifs, pull out the following info
      // - title and the url for the fixed_height image
      resultingGifs.map(gif => {
        let newGif = {}
        newGif.title = gif.title
        newGif.image = gif.images.fixed_height.url
        gifImages.push(newGif)
      })
      // Send the gifImages back to redux
      res.send(gifImages)
    })
    .catch((err) => {
      console.log('GET serachGifyUrl error:', err);
      res.sendStatus(500);
    })
})

module.exports = router;
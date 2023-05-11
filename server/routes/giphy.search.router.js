const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();



router.get('/', (req, res) => {
    let rating = req.query.rating
    const searchQuery = req.query.searchQuerygiph

    // Set up initial search query, this will provide gifs that;
    // - Have a "tag" of ${searchQuery}
    // - Have a "rating" of ${rating}
    // - Limit us to 10 results
    const searchGifyUrl = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&tag=${searchQuery}&rating=${rating}&limit=10`

    axios.get(searchGifyUrl)
        .then((response) => {
            console.log('\n\n\nResponse.data within get route from GIPHY:\n\n\n',response.data);
            // Send okay until I know what the data looks like.
            res.send(200)
        })
        .catch((err) => {
            console.log('GET randomGifyUrl error:', err);
            res.sendStatus(500);
        })
})

module.exports = router;
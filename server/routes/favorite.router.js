const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  console.log('inside get favorite');
  console.log('req.body in get favorite:', req.body);
  const sqlText = `
  SELECT 
    favorite.id,
    favorite.title,
    favorite.image_path,
    category.name AS category
  FROM favorite
    JOIN category ON favorite.category_id = category.id;
  `;
  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('Error with GET /favorite:', dbErr);
      res.sendStatus(500);
    })
});

// add a new favorite
router.post('/', (req, res) => {
  const favoriteGif = req.body;
  let categoryId;
  switch (favoriteGif.category) {
    case 'funny':
      categoryId=1; break;
    case 'cohort':
      categoryId=2; break;
    case 'cartoon':
      categoryId=3; break;
    case 'nsfw':
      categoryId=4; break;
    case 'meme':
      categoryId=5; break;
    default:
      ''
  }
  console.log('categoryId inside POST', categoryId);
  const sqlText = `
    INSERT INTO favorite
    (title, image_path, category_id)
    VALUES
    ($1, $2, $3);
  `;
  const sqlValues = [favoriteGif.gif.title, favoriteGif.gif.image, categoryId]
  
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      // Send "Created" status
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log('Error with POST /favorite:', dbErr);
      res.sendStatus(500);
    })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

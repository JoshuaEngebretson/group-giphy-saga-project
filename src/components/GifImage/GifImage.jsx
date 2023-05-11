import Swal from "sweetalert2";
import { useState } from "react";
import React from 'react';

function GifImage({ gif }) {

  const [favoriteCategory, setFavoriteCategory] = useState('');

  const handleCategoryChoice = (event) => {
    setFavoriteCategory(event.target.value)
    console.log('favoriteCategory:', favoriteCategory, event.target.value);
  }

  const addToFavorites = () => {
    console.log('Clicked Favorite button');
    Swal.fire({
      icon: 'question',
      title: 'Choose a favorite category!',
      showCancelButton: true,
      html: `
        <p>Category</p>
        <select name="catagory" onChange=${handleCategoryChoice}>
          <option value="" disabled selected>Select a Category</option>
          <option value="cartoon">Cartoon</option>
          <option value="cohort">Cohort</option>
          <option value="funny">Funny</option>
          <option value="meme">Meme</option>
          <option value="nsfw" >NSFW</option>
        </select>
        <p>Favorited Image</p>
        <img src=${gif.image}>
      `
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Favorite category:', result);
        // Do something with the selected category here
      }
    });
  };

  return (
    <>
      <img
        key={gif.image}
        src={gif.image}
        alt={gif.title}
      />
      <button onClick={addToFavorites}>Favorite</button>
    </>
  )
}

export default GifImage;
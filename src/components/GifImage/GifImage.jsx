import Swal from "sweetalert2";
import { useState } from "react";

function GifImage({gif}) {

  const [favoriteCategory, setFavoriteCategory] = useState('');

  const addToFavorites = () => {
    console.log('Clicked Favorite button');
    Swal.fire({
      icon: 'success',
      title: 'Favorited!',
      html: `
        <p>Clicked Favorite button</p>
        <img src=${gif.image}>
        <p>Favorite Category</p>
        <select name="catagory">
          <option value="" disabled selected>Select a Category</option>
          <option value="cartoon">Cartoon</option>
          <option value="cohort">Cohort</option>
          <option value="funny">Funny</option>
          <option value="meme">Meme</option>
          <option value="nsfw">NSFW</option>
        </select>
      `
    })
  }

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
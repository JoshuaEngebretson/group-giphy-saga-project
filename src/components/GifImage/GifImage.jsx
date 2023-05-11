import Swal from "sweetalert2";
import { useState } from "react";

function GifImage({gif}) {

  const [favoriteCategory, setFavoriteCategory] = useState('');

  const handleCategoryChoice = (event) => {
    setFavoriteCategory(event.target.value)
    console.log('favoriteCategory:', favoriteCategory);
  }

  const addToFavorites = () => {
    console.log('Clicked Favorite button');
    Swal.fire({
      icon: 'question',
      title: 'Choose a favorite category!',
      html: `
        <p>Category</p>
        <select name="catagory">
          <option value="" disabled selected>Select a Category</option>
          <option value="cartoon" onChange=${handleCategoryChoice}>Cartoon</option>
          <option value="cohort" onChange=${handleCategoryChoice}>Cohort</option>
          <option value="funny" onChange=${handleCategoryChoice}>Funny</option>
          <option value="meme" onChange=${handleCategoryChoice}>Meme</option>
          <option value="nsfw" onChange=${handleCategoryChoice}>NSFW</option>
        </select>
        <p>Favorited Image</p>
        <img src=${gif.image}>
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
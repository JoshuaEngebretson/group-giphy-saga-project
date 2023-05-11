import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

function GifImage({ gif }) {

  const dispatch = useDispatch();

  let choice;
  const addToFavorites = async () => {
    console.log('Clicked Favorite button');
    const categoryChoice = await Swal.fire({
      title: 'Choose a favorite category!',
      input: 'select',
      inputOptions: {
        'cartoon': 'Cartoon',
        'cohort': 'Cohort',
        'funny': 'Funny',
        'meme': 'Meme',
        'nsfw': 'NSFW'
      },
      inputPlaceholder: 'Select a Category',
      imageUrl: gif.image,
      showCancelButton: true,
      confirmButtonText: `Add to favorites.`,
      cancelButtonText: `Don't add this Gif.`,
      inputValidator: (categoryChoice) => {
        return new Promise((resolve) => {
          if (categoryChoice !== '') {
            choice = categoryChoice
            resolve()
          } else {
            resolve('You need to select a Category :)')
          }
        })
      }
    }).then((result) => {
      if(result.isConfirmed) {
        if (choice !== '') {
          dispatch({
            type: 'ADD_TO_FAVORITES',
            payload: {
              gif: gif,
              category: choice
            }
          })
          Swal.fire({
            icon: 'success',
            title: 'Added to Favorites',
            text: `You selected ${categoryChoice}`
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'You need to choose a favorite category'
          })
          // addToFavorites();
        }
      }
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
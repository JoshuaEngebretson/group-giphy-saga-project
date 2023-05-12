import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function FavoriteGifItem ({gif}) {

  const dispatch = useDispatch();

  let choice;
  const adjustCategory = async () => {
    console.log('Current category:', gif.category);
    await Swal.fire({
      title: 'Adjust favorite category!',
      text: `Current Category: ${gif.category}`,
      input: 'select',
      inputOptions: {
        'cartoon': 'Cartoon',
        'cohort': 'Cohort',
        'funny': 'Funny',
        'meme': 'Meme',
        'nsfw': 'NSFW'
      },
      inputPlaceholder: 'Select a Category',
      imageUrl: gif.image_path,
      showCancelButton: true,
      confirmButtonText: `Change Category`,
      cancelButtonText: `Don't change this Gif's Category`,
      inputValidator: (categoryChoice) => {
        return new Promise((resolve) => {
          if (categoryChoice !== '') {
            choice = categoryChoice
            resolve()
          } else {
            resolve('You need to select a Category')
          }
        })
      }
    }).then((result) => {
      if(result.isConfirmed) {
        if (choice !== '') {
          dispatch({
            type: 'ADJUST_FAVORITE_CATEGORY',
            payload: {category: choice, id: gif.id}
          })
          Swal.fire({
            icon: 'success',
            title: 'Adjusted the Category!',
            text: `You selected ${choice}`
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
    // dispatch({
    //   type: 'ADJUST_FAVORITE_CATEGORY',
    //   payload: {category: gif.category, id: gif.id}
    // })
  }
  return (
    <div onClick={adjustCategory}>
    <h2>{gif.category}</h2>
    <img src={gif.image_path} alt={gif.title} key={gif.id}/>
    </div>
  )
}

export default FavoriteGifItem;
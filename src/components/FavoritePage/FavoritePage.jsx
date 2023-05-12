import { useSelector } from "react-redux"
import GifImage from "../GifImage/GifImage"

function FavoritePage() {
    const favoriteGifs = useSelector(store => store.favoriteGifs)

    return (
        <>
            <h1>Inside Favorited Gifs</h1>
            {favoriteGifs.map(gif => {
                return (
                    <>
                    <img src={gif.image_path} alt={gif.title} key={gif.id}/>
                    <h2>{gif.category}</h2>
                    </>
                )
            })}
        </>
    )
}

export default FavoritePage;
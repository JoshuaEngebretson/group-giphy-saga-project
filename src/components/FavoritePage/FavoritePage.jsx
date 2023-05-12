import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import FavoriteGifItem from "./FavoriteGifItem";

function FavoritePage() {
    const favoriteGifs = useSelector(store => store.favoriteGifs)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_FAVORITE_GIFS'
        });
    }, []);

    return (
        <>
            <h1>Inside Favorited Gifs</h1>
            {favoriteGifs.map(gif => {
                return (
                    <FavoriteGifItem key={gif.id} gif={gif} />
                )
            })}
        </>
    )
}

export default FavoritePage;
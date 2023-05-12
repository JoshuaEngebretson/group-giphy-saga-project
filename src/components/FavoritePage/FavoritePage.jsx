import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

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
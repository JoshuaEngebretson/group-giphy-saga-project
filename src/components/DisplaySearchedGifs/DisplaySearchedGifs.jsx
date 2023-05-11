import { useSelector } from "react-redux";
import GifImage from "../GifImage/GifImage";

function DisplaySearchedGifs() {

  const searchGIFS = useSelector(store => store.searchGIFS)

  return (
    <>
      <h1>Inside Display Searched Gifs</h1>
      {searchGIFS.map(gif => {
        return (
          <GifImage key={gif.image} gif={gif}/>
        )
      })}
    </>
  )
}

export default DisplaySearchedGifs;
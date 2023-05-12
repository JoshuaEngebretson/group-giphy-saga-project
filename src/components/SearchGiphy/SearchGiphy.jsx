import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import './SearchGiphy.css';

function SearchGiphy() {

  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const [search, setSearch] = useState('');


  useEffect(() => {
    searchGIFS();
  }, []);

  const searchGIFS = () => {
    console.log('clicked search');
    dispatch({
      type: 'SAGA/GET_SEARCH',
      payload: {
        rating: rating,
        searchQuery: search
      }
    })
  }
  const displayFavorite = () => {
    dispatch({
      type:''
    })
  }

  const handleRatingChoice = event => {
    setRating(event.target.value)
  }

  const handleSearchEntry = event => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <header className="App-header">
        <h1>Search Giphy API</h1>
      </header>
      <div>
        <h3>Choose a rating for the Gifs:</h3>
        <input
          type='radio'
          value='g'
          name='rating'
          onChange={handleRatingChoice}
        />
        <label htmlFor='g'>G</label>
        <input
          type='radio'
          value='pg'
          name='rating'
          onChange={handleRatingChoice}
        />
        <label htmlFor='pg'>PG</label>
        <input
          type='radio'
          value='pg-13'
          name='rating'
          onChange={handleRatingChoice}
        />
        <label htmlFor='pg-13'>PG-13</label>
        <input
          type='radio'
          value='r'
          name='rating'
          onChange={handleRatingChoice}
        />
        <label htmlFor='r'>R</label>
          <h3>Enter a keyword for the Gifs:</h3>
        <input
          type='text'
          onChange={handleSearchEntry}
          value={search}
        />
        <br />
        <button onClick={searchGIFS}>Search Gifs</button>
        <br />
        <br />
        <div className="fav-cat">
          <select name="Favorites" id="favorites" onchange={favoritePgae}>
            <option selected disabled hidden>Favorites</option>
            <option value="cartoon">Cartoon</option>
            <option value="cohort">Cohort</option>
            <option value="funny">Funny</option>
            <option value="meme">Meme</option>
            <option value="nsfw">Nsfw</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchGiphy;
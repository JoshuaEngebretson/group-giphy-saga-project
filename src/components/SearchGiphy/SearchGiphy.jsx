import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

function SearchGiphy() {

  const dispatch = useDispatch();
  const random = useSelector(state => state.random);
  const [rating, setRating] = useState('');
  const [search, setSearch] = useState('');


  useEffect(() => {
    getRandomGify();
  }, []);

  const getRandomGify = () => {
    axios({
      method: 'GET',
      url: '/random',
      params: {
        rating: rating,
        searchQuery: search
      }
    })
      .then((response) => {
        const randomGif = response.data
        dispatch({
          type: 'SET_RANDOM',
          payload: randomGif
        })
      })
      .catch((err) => {
        console.log('Error inside getRandomGify:', err);
      })
  }

  const handleRatingChoice = event => {
    setRating(event.target.value)
  }

  return (
    <div>
    <header className="App-header">
      <h1>Search Giphy API</h1>
    </header>
    <div>
    <h3>Choose a rating for the random Gif:</h3>
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

      <h3>Enter a keyword for the random Gif:</h3>
        <input 
          type='text'
          onChange={handleSearchEntry}
          value={search}
        />
      <br />
      <button onClick={getRandomGify}>Random Gif</button>
    </div>

    <img src={random.url} alt={random.title}/>
  </div>
  )
}

export default SearchGiphy;
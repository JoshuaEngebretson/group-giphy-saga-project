import React from 'react';
import SearchGiphy from '../SearchGiphy/SearchGiphy';
import DisplaySearchedGifs from '../DisplaySearchedGifs/DisplaySearchedGifs';

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <SearchGiphy />
      <DisplaySearchedGifs />
    </div>
  );
}

export default App;

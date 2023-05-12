import React from 'react';
import SearchGiphy from '../SearchGiphy/SearchGiphy';
import DisplaySearchedGifs from '../DisplaySearchedGifs/DisplaySearchedGifs';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import FavoritePage from '../FavoritePage/FavoritePage.jsx';

function App() {
  return (
    <div>
      <h1>Giphy Search!</h1>

      <Router>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/favorite'>Favorites</Link></li>
        </ul>
        <Route exact path='/'>
          <SearchGiphy />
          <DisplaySearchedGifs />
        </Route>
        <Route exact path='/favorite'>
          <FavoritePage />
        </Route>
      </Router>
    </div>
  );
}

export default App;

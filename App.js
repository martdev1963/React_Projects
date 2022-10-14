import React from 'react';


import { useState, useEffect } from 'react';

import MovieCard from './movieCard';

import './App.css';
import SearchIcon from './search.svg'; 

const API_URL = 'http://www.omdbapi.com?apikey=5dcd12de';

// static data object just for testing output to jsx...(key/value) pairs...
const movie1 = {
  "Title": "Superman, Spiderman or Batman",
  "Year": "2011",
  "imdbID": "tt2084949",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
}

const App = () => {
  // a new state...
  // you can have multiple states and even multiple use effect hooks per one component. There is no limit...
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      console.log(data.Search);
      setMovies(data.Search);

    }
  
    useEffect(() => {
      searchMovies('Spiderman');
    }, []);

  return (
    // JSX
      <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
          <input 
            placeholder="Search for movies"
            value={searchTerm} // now its dynamic...
            // value="Superman"... was static
            //onChange={() => {}}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img 
            src={SearchIcon}
            alt="search"
            onClick= {() => searchMovies(searchTerm)}
            //onClick= {() =>{}}
          />
        </div>
        
        { movies?.length > 0
          ? (
            <div className="container">
              {/*<MovieCard  movie1={movies[0]} /> */}
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
             ))}
            </div>

            ) : ( 
                <div className="empty">
                  <h2>NO MOVIES FOUND...</h2>
                </div>

             )} 
         
      </div>
   );
}


export default App;

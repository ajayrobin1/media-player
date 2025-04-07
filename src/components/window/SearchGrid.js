import React, { useState } from "react";
import MovieCard from "../MovieCard";

const API_URL = "https://api.themoviedb.org/3/search/multi";

const SearchGrid = ({ setSelected, setMenu, focused, setFocused, loading, setLoading}) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault()
    if (!query) return;
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`);
      const data = await response.json();
      setResults(data.results.splice(0,10) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <div className=" absolute p-6 w-screen mx-auto">
      <h2 className="flex flex-row md:gap-0 gap-4 text-xl font-bold mb-4 text-white"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        <span>
      Movie & TV Show Search
        </span> 
      </h2>
      <form onSubmit={searchMovies}>
      <div className="flex flex-col md:flex-row gap-2 md:w-1/2 mx-auto w-full">
        <input
          type="text"
          placeholder="Search for a movie or TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="z-50 w-full text-xl p-4 h-full bg-black/80 text-white"
          />
        <button type="submit" className="px-4 py-2 md:p-4 bg-red-600 w-1/4 mx-auto h-full text-white">
          Search
        </button>
      </div>
          </form>

      {loading && <p className="mx-auto mt-4">Searching...</p>}

      <div className="select-none no-scroll-bar no-wrap flex flex-row gap-6 py-8 bg-none justify-start px-8 overflow-x-auto overflow-y-hidden">
        {results.map((movie, index) => (
         <MovieCard key={index} movie={movie} isFocused={focused === movie} 

         handleClick={ () =>{
             setLoading(true) 
             setMenu(`${movie.media_type}-info`)  
             setSelected(movie)
             setLoading(false)
           }}
           
           onMouseEnter={() => {
             if(focused !== movie && !loading)
               setFocused(movie)
           }}

/>
        ))}
      </div>
    </div>
  );
};

export default SearchGrid;

import { useEffect, useState } from "react";
import MovieCard from "../MovieCard"

const MovieGrid = ({ loading, setLoading, setSelected, focused, setFocused, setMenu}) =>{

    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      const fetchMovies = async () => {
          try {
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setFocused(data.results.at(0))
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        };
          fetchMovies();
    }, [setFocused]);


  
  return(
    <div className="w-screen h-full flex flex-col justify-end pt-4">

  <h1 className="z-50 text-xl text-white px-8"> Top Rated Movies</h1>


      <div className="select-none no-scroll-bar no-wrap flex flex-row gap-6 p-2 md:py-8 bg-none justify-start md:px-8 overflow-x-auto overflow-y-hidden">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} isFocused={focused === movie}

          handleClick={ () =>{
              setLoading(true)   
              setSelected(movie)
              setMenu(`movie-info`)
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
)

}

export default MovieGrid ;
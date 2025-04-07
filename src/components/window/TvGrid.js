import { useEffect, useState } from "react";
import MovieCard from "../MovieCard"

const TvGrid = ({ loading, setLoading, setSelected, setBackdrop, setMenu, focused, setFocused}) =>{

    const [tvshows, setTvshows] = useState([]);
  
    useEffect(() => {
      const fetchMovies = async () => {
          try {
            const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setTvshows(data.results);
            setFocused(data.results.at(0))
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        };
        fetchMovies()
    }, [setFocused]);

  
  
  return(
    <div className="w-screen h-full flex flex-col justify-end">

  <h1 className="z-50 text-xl text-white px-8"> Top Rated Movies</h1>


      <div className="select-none no-scroll-bar no-wrap flex flex-row gap-6 py-8 bg-none justify-start px-8 overflow-x-auto overflow-y-hidden">
        {tvshows.map((tvshow, index) => (
          <MovieCard key={index} movie={tvshow} isFocused={focused === tvshow}

          handleClick={ () =>{
              setLoading(true)   
              setSelected(tvshow)
              setMenu(`tv-info`)
              setLoading(false)
            }}
            
            onMouseEnter={() => {
              if(focused !== tvshow && !loading)
                setFocused(tvshow)
            }}
            />
          ))}
      </div>
</div>
)

}

export default TvGrid ;
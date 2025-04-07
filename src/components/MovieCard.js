
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({movie, isFocused, handleClick, onMouseEnter}) => {
    
    return (
      <div
        className={`relative z-20 lg:w-1/8 md:1/6 w-1/4 drop-shadow-md h-auto shrink-0 bg-black rounded-lg overflow-hidden shadow-xl shadow-black/50 ${isFocused? 'border-red-600 border-4' : 'border-transparent'} transition-transform duration-300`}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
      >
  
        <img  alt={movie.title}
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        className={`w-full h-full ${isFocused?'opacity-70':'opacity-100'}`} />
   
        {isFocused && (
          <div className={`absolute inset-0 flex flex-col select-none items-center justify-evenly text-white p-4`}>
            <p className="text-xl mt-2">({movie.release_date?movie.release_date?.split('-').at(0): movie.first_air_date.split('-').at(0)})</p>
          </div>
        )}
  
      </div>
    );
  };

export default MovieCard;

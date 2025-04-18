import React, { useEffect, useState } from "react";
import { movieGenres } from "../../../src/genre";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w300";


const MovieDetails = ({ movie, setVideoUrl, setNowPlaying }) => {

    const { title, poster_path, overview, genre_ids, release_date, vote_average } = movie;
   
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState(true);
    const [infoHash, setInfoHash] = useState('');

    const ipAddress = localStorage.getItem('server-address') ?? 'http://localhost:8080'

    
  const calculateEndTime = (runtime) => {
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + runtime);
    return currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handlePlay = () => {
    setVideoUrl(`${ipAddress}/video/${infoHash}`)
    setNowPlaying(movieData)
  }
  
  useEffect(() => {
    async function addTorrent(){
      
        const {title, release_date} = movie;

        const data = { keyword: `${title} ${release_date?.split('-').at(0)}`, index: 1}

        
        try {
            await fetch(`${ipAddress}/search`, {
                method:'post',
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(data)
            }).then(res => res.json().then(data => {
                console.log(data)
                setInfoHash(data.infoHash)
            }))
        } catch (error) {
            
            console.log(error)
            
        }
        setLoading(false)
    }
    addTorrent();


    async function getAdditionalData(params) {
        const {id} = movie;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const data = await response.json();

        const imageRsponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
          );
          const imageData = await imageRsponse.json();

          const file_path = imageData.logos.find((img) => img.iso_639_1 === "en").file_path

        
        setMovieData({...data , logo_path: file_path? file_path : imageData.logos.at(0).file_path}) 
    
    }
    getAdditionalData()

  }, [movie, ipAddress])

  return (
    <>
      {/* Movie Details */}
      <div className="w-screen z-10 self- bg-radial from-black/80 to-transparent w-screen justify-center flex flex-col md:flex-row items-center p-6 md:p-12 gap-6 md:gap-24 text-white">
        {/* Poster */}
        <img
          src={`${IMAGE_BASE_URL}${poster_path}`}
          alt={title}
          className="h-auto w-2/3 md:w-1/4 object-cover rounded-sm shadow-lg shadow-black/75"
        />

        {/* Details */}
        <div className="max-w-2xl">

    {/* logo */}

        {movieData.logo_path?
        <img
          src={`${LOGO_BASE_URL}${movieData.logo_path}`}
          alt={movie.title}
          className="object-contain select-none max-h-32 py-4 mx-auto"
        />
    :    
    // title
          <h2 className="text-2xl font-bold text-white h-12">{movie.title}</h2>
        }
          <div className="flex items-center gap-4 text-sm text-gray-100 mb-4">
            <span>{release_date.split("-").reverse().join("/")}</span>
            <span className="px-2 py-1 bg-gray-800">{movieData?.runtime} min</span>
            <span>Ends at: {calculateEndTime(movieData?.runtime)}</span>
          </div>
          <p className="text-gray-100 mb-4 md:text-lg">{overview}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {genre_ids.map((item) => (
              <span key={item} className="px-3 py-1 bg-gray-800 text-sm">
                  {movieGenres[item]}
              </span>
            ))}
          </div>
          <div className="flex self-center items-center gap-4 mb-4 my-2">
          <span>
          <svg className="large" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#29b6f6" d="M47.21,31.81H47.2c-0.09-0.24-0.22-0.46-0.39-0.65c-0.17-0.18-0.37-0.34-0.59-0.45 c-0.25-0.12-0.51-0.21-0.78-0.25v-0.02c0.42-0.12,0.8-0.36,1.08-0.69c0.29-0.35,0.43-0.78,0.42-1.23c0.01-0.4-0.08-0.8-0.29-1.14 c-0.18-0.28-0.43-0.51-0.73-0.67c-0.32-0.16-0.67-0.27-1.03-0.32c-0.29-0.04-0.59-0.07-0.89-0.07c-0.08-0.01-0.16-0.01-0.24-0.01 h-3.24V35h3.56c0.39,0,0.77-0.04,1.15-0.12c0.38-0.08,0.73-0.21,1.06-0.41c0.3-0.18,0.56-0.43,0.76-0.73 c0.2-0.35,0.31-0.75,0.29-1.15C47.34,32.32,47.3,32.06,47.21,31.81z M42.43,27.94h1.3c0.09,0,0.18,0.01,0.27,0.02 c0.06,0,0.13,0.01,0.19,0.02c0.14,0.03,0.28,0.08,0.41,0.14c0.13,0.07,0.23,0.17,0.3,0.28c0.09,0.14,0.13,0.29,0.12,0.45 c0,0.15-0.03,0.3-0.1,0.44c-0.07,0.12-0.17,0.22-0.28,0.3c-0.12,0.07-0.25,0.12-0.39,0.15c-0.08,0.02-0.17,0.04-0.25,0.04 c-0.06,0.01-0.12,0.01-0.18,0.01h-1.39V27.94z M45.31,32.85c-0.08,0.13-0.18,0.24-0.3,0.32c-0.13,0.08-0.27,0.14-0.41,0.17 c-0.15,0.03-0.3,0.05-0.45,0.05h-1.72v-1.96h1.45c0.04,0,0.08,0,0.12,0.01c0.12,0,0.25,0,0.37,0.02c0.17,0.03,0.34,0.07,0.5,0.14 c0.15,0.06,0.29,0.16,0.39,0.29c0.11,0.14,0.16,0.31,0.15,0.49C45.42,32.54,45.39,32.71,45.31,32.85z M38.07,28.66 c-0.26-0.53-0.64-0.99-1.11-1.35c-0.3-0.22-0.62-0.4-0.96-0.53c-0.22-0.1-0.45-0.18-0.68-0.23c-0.65-0.16-1.31-0.24-1.98-0.24 h-2.87V35h3.12c0.63,0,1.26-0.09,1.86-0.28c0.19-0.06,0.37-0.13,0.55-0.22c0.36-0.15,0.7-0.35,1.01-0.6 c0.45-0.37,0.81-0.83,1.07-1.35c0.28-0.58,0.41-1.22,0.4-1.86C38.5,29.99,38.36,29.3,38.07,28.66z M36.24,31.84 c-0.06,0.15-0.14,0.29-0.24,0.42c-0.11,0.15-0.25,0.29-0.4,0.41c-0.3,0.22-0.63,0.37-0.99,0.45c-0.4,0.09-0.81,0.14-1.22,0.13h-1 V28.1h1.13c0.39,0,0.77,0.05,1.15,0.15c0.34,0.1,0.66,0.25,0.95,0.46c0.14,0.11,0.27,0.24,0.38,0.38 c0.09,0.12,0.18,0.25,0.24,0.39c0.17,0.35,0.26,0.73,0.25,1.11C36.5,31.02,36.42,31.45,36.24,31.84z M17.04,15L16,17.93 l-0.97,2.74H15L13,15h-2.9v8.69h1.92v-6.66h0.02l2.21,6.66h1.48L16,22.9l2.01-5.87h0.02v6.66h1.92V15H17.04z M0.73,15v1.69h2.48v7 h1.91V16.7H7.6V15H0.73z M28,29.24c-0.21-0.67-0.58-1.26-1.07-1.75c-0.76-0.75-1.78-1.23-2.93-1.26 c-0.04-0.01-0.09-0.01-0.14-0.01H4.99c-0.34,0-0.67,0.04-0.99,0.12c-1.92,0.44-3.35,2.17-3.35,4.22c0,1.2,0.49,2.28,1.27,3.07 C2.48,34.2,3.2,34.6,4,34.78c0.32,0.08,0.65,0.12,0.99,0.12h18.87c0.05,0,0.1,0,0.14-0.01c1.88-0.05,3.45-1.3,4-3.01 c0.13-0.42,0.2-0.86,0.2-1.32C28.2,30.1,28.13,29.66,28,29.24z M46.08,16.45c-0.56-0.57-1.28-0.97-2.08-1.15 c-0.32-0.08-0.65-0.12-0.99-0.12H26.59c-0.97,0-1.87,0.32-2.59,0.86c-1.06,0.79-1.75,2.05-1.75,3.48c0,1.2,0.49,2.28,1.27,3.06 c0.15,0.15,0.31,0.29,0.48,0.41c0.73,0.54,1.63,0.86,2.59,0.86h16.42c0.34,0,0.67-0.04,0.99-0.12c1.92-0.44,3.35-2.16,3.35-4.21 C47.35,18.32,46.86,17.24,46.08,16.45z"></path><polygon fill="#a5d6a7" points="4,15 4,23.69 3.21,23.69 3.21,16.69 0.73,16.69 0.73,15"></polygon><path fill="#a5d6a7" d="M4,26.34v8.44c-0.8-0.18-1.52-0.58-2.08-1.15c-0.78-0.79-1.27-1.87-1.27-3.07 C0.65,28.51,2.08,26.78,4,26.34z"></path><polygon fill="#9ad3ae" points="5.12,23.69 4,23.69 4,15 7.6,15 7.6,16.7 5.12,16.7"></polygon><path fill="#9ad3ae" d="M8,26.22v8.68H4.99c-0.34,0-0.67-0.04-0.99-0.12v-8.44c0.32-0.08,0.65-0.12,0.99-0.12H8z"></path><rect width="1.9" height="8.69" x="10.1" y="15" fill="#8ed0b5"></rect><rect width="4" height="8.68" x="8" y="26.22" fill="#8ed0b5"></rect><polygon fill="#83cdbd" points="16,17.93 16,22.9 15.73,23.69 14.25,23.69 12.04,17.03 12.02,17.03 12.02,23.69 12,23.69 12,15 13,15 15,20.67 15.03,20.67"></polygon><rect width="4" height="8.68" x="12" y="26.22" fill="#83cdbd"></rect><polygon fill="#78cac4" points="18.01,17.03 16,22.9 16,17.93 17.04,15 19.95,15 19.95,23.69 18.03,23.69 18.03,17.03"></polygon><rect width="4" height="8.68" x="16" y="26.22" fill="#78cac4"></rect><path fill="#6dc7cb" d="M24,16.04v6.95c-0.17-0.12-0.33-0.26-0.48-0.41c-0.78-0.78-1.27-1.86-1.27-3.06 C22.25,18.09,22.94,16.83,24,16.04z"></path><path fill="#6dc7cb" d="M23.86,26.22c0.05,0,0.1,0,0.14,0.01v8.66c-0.04,0.01-0.09,0.01-0.14,0.01H20v-8.68H23.86z"></path><path fill="#61c5d2" d="M28,15.18v8.67h-1.41c-0.96,0-1.86-0.32-2.59-0.86v-6.95c0.72-0.54,1.62-0.86,2.59-0.86H28z"></path><path fill="#61c5d2" d="M26.93,27.49c0.49,0.49,0.86,1.08,1.07,1.75v2.64c-0.55,1.71-2.12,2.96-4,3.01v-8.66 C25.15,26.26,26.17,26.74,26.93,27.49z"></path><path fill="#56c2d9" d="M28,29.24c0.13,0.42,0.2,0.86,0.2,1.32c0,0.46-0.07,0.9-0.2,1.32V29.24z"></path><rect width="4" height="8.67" x="28" y="15.18" fill="#56c2d9"></rect><rect width="1.53" height="8.69" x="30.47" y="26.31" fill="#56c2d9"></rect><rect width="4" height="8.67" x="32" y="15.18" fill="#4bbfe0"></rect><path fill="#4bbfe0" d="M32.39,28.1v5.15h1c0.41,0.01,0.82-0.04,1.22-0.13c0.36-0.08,0.69-0.23,0.99-0.45 c0.15-0.12,0.29-0.26,0.4-0.41v2.24c-0.18,0.09-0.36,0.16-0.55,0.22c-0.6,0.19-1.23,0.28-1.86,0.28H32v-8.69h1.34 c0.67,0,1.33,0.08,1.98,0.24c0.23,0.05,0.46,0.13,0.68,0.23v2.31c-0.11-0.14-0.24-0.27-0.38-0.38c-0.29-0.21-0.61-0.36-0.95-0.46 c-0.38-0.1-0.76-0.15-1.15-0.15H32.39z"></path><path fill="#40bce8" d="M38.48,30.69c0.01,0.64-0.12,1.28-0.4,1.86c-0.26,0.52-0.62,0.98-1.07,1.35 c-0.31,0.25-0.65,0.45-1.01,0.6v-2.24c0.1-0.13,0.18-0.27,0.24-0.42c0.18-0.39,0.26-0.82,0.25-1.25c0.01-0.38-0.08-0.76-0.25-1.11 c-0.06-0.14-0.15-0.27-0.24-0.39v-2.31c0.34,0.13,0.66,0.31,0.96,0.53c0.47,0.36,0.85,0.82,1.11,1.35 C38.36,29.3,38.5,29.99,38.48,30.69z"></path><rect width="4" height="8.67" x="36" y="15.18" fill="#40bce8"></rect><path fill="#34b9ef" d="M44,15.3v8.43c-0.32,0.08-0.65,0.12-0.99,0.12H40v-8.67h3.01C43.35,15.18,43.68,15.22,44,15.3z"></path><path fill="#34b9ef" d="M42.43,27.94v1.85h1.39c0.06,0,0.12,0,0.18-0.01v1.66c-0.04-0.01-0.08-0.01-0.12-0.01h-1.45v1.96H44 V35h-3.48v-8.69h3.24c0.08,0,0.16,0,0.24,0.01v1.64c-0.09-0.01-0.18-0.02-0.27-0.02H42.43z"></path><path fill="#29b6f6" d="M44,23.73V15.3c0.8,0.18,1.52,0.58,2.08,1.15c0.78,0.79,1.27,1.87,1.27,3.07 C47.35,21.57,45.92,23.29,44,23.73z"></path><path fill="#29b6f6" d="M47.34,32.59c0.02,0.4-0.09,0.8-0.29,1.15c-0.2,0.3-0.46,0.55-0.76,0.73 c-0.33,0.2-0.68,0.33-1.06,0.41C44.85,34.96,44.47,35,44.08,35H44v-1.61h0.15c0.15,0,0.3-0.02,0.45-0.05 c0.14-0.03,0.28-0.09,0.41-0.17c0.12-0.08,0.22-0.19,0.3-0.32c0.08-0.14,0.11-0.31,0.1-0.47c0.01-0.18-0.04-0.35-0.15-0.49 c-0.1-0.13-0.24-0.23-0.39-0.29c-0.16-0.07-0.33-0.11-0.5-0.14c-0.12-0.02-0.25-0.02-0.37-0.02v-1.66c0.08,0,0.17-0.02,0.25-0.04 c0.14-0.03,0.27-0.08,0.39-0.15c0.11-0.08,0.21-0.18,0.28-0.3c0.07-0.14,0.1-0.29,0.1-0.44c0.01-0.16-0.03-0.31-0.12-0.45 c-0.07-0.11-0.17-0.21-0.3-0.28c-0.13-0.06-0.27-0.11-0.41-0.14c-0.06-0.01-0.13-0.02-0.19-0.02v-1.64c0.3,0,0.6,0.03,0.89,0.07 c0.36,0.05,0.71,0.16,1.03,0.32c0.3,0.16,0.55,0.39,0.73,0.67c0.21,0.34,0.3,0.74,0.29,1.14c0.01,0.45-0.13,0.88-0.42,1.23 c-0.28,0.33-0.66,0.57-1.08,0.69v0.02c0.27,0.04,0.53,0.13,0.78,0.25c0.22,0.11,0.42,0.27,0.59,0.45c0.17,0.19,0.3,0.41,0.39,0.65 h0.01C47.3,32.06,47.34,32.32,47.34,32.59z"></path>
</svg>
          </span>
            <span className="text-xl font-semibold"> {Math.round(vote_average * 10)/10}</span>

          </div>
          <div className="flex gap-4">
            <button 
            onClick={handlePlay}
                type="button"  
                disabled={loading}
                className={`drop-shadow-lg text-center px-6 py-3 bg-red-600 ${!loading && 'hover:bg-red-700'} text-lg font-semibold w-30 ${loading && 'cursor-not-allowed'}`}>
                  {loading ? (
        <div className="w-6 h-6 border-4 border-white border-t-transparent mx-auto rounded-full animate-spin"></div>
      ) : (
      <span>
              ▶ Play
      </span>
      )}
            </button>
            <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-lg font-semibold drop-shadow-lg">
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

import ReactPlayer from 'react-player/lazy';
import { useState, useRef, useEffect, useMemo } from "react";
import enhanceAudio from '../functions/enhanceAudio';
// const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w300";

const Player = ( { videoUrl, fullscreenMode, setLoading, nowPlaying }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState('--:--');
  const [duration, setDuration] = useState('--:--');


  const toggleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const togglePlay = () => setPlaying(!playing);
  const toggleMute = () => {
    setMuted(!muted)
  };

  const handleProgress = (state) => {
    if(!seeking) setPlayed(state.played);
  };

  const handleMouseDown = (e) =>{
    setSeeking(true);
  }

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
  };


  const handleMouseUp = (e) =>{
    setSeeking(false)
    playerRef.current.seekTo(e.target.value)
  }



  const onStart = () =>{
    if(playerRef.current) enhanceAudio(playerRef.current)
  }

  const onReady = () => {
    setPlaying(true)
    setLoading(false)
    const duration = playerRef.current.getDuration()
    const timeString = new Date(duration  * 1000).toISOString().substring(11, 19)
    setDuration(timeString)
  }  

  useMemo(() => {
    function refreshClock() {
      const currenTime = playerRef.current?.getCurrentTime();
      
      const timeString  = (currenTime <3600) ? 
      new Date(currenTime * 1000).toISOString().substring(14, 19)
      :
      new Date(currenTime  * 1000).toISOString().substring(11, 16)
      setCurrentTime(timeString)
      // setTime(new Date());
    }
    const timerID = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [setCurrentTime]);


  
  useEffect(() => {
    const handleKeyDown = (event) => {

      switch (event.key) {
        case " ":
          
          setPlaying(!playing);
          break;

        case "ArrowUp":
          setShowVolume(true)
          setVolume((prev) => Math.min(prev + 0.1, 1));      
          setTimeout(() => setShowVolume(false), 3000);
          break;
        case "ArrowDown":
          setShowVolume(true)
          setVolume((prev) => Math.max(prev - 0.1, 0));
          setTimeout(() => setShowVolume(false), 3000);
          break;
        default:
          console.log("default event")
      }
    
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playing]);


  
  return (
    <>
    {videoUrl &&
    <div className="relative w-full h-screen overflow-y-hidden bg-black flex items-center justify-center"
    >
    {/* Video Player */}
    <ReactPlayer
      ref={playerRef}
      url={videoUrl}
      playing={playing}
      controls={false}
      muted={muted}
      height={fullscreen? '100%' : 'auto'} 
      width={'100vw'} 
      volume={volume}
      onStart={onStart}
      onReady={onReady}
      className={'mx-auto'}
      
      // onPlay={onPlay}
      config={{
        file: { attributes: { crossOrigin: "anonymous" } },
      }}
      onProgress={handleProgress}
    />

  

    <div className={`absolute top-0 left-0 bg-black/50 mt-16 ml-16 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${(playing === false && showControls === false)? 'opacity-100' : 'opacity-0' }`}>
<svg xmlns="http://www.w3.org/2000/svg" className='large' height="48px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>
    </div>

     
    {/* OSD Overlay */}
    <div className={`z-20 absolute inset-0 flex flex-col justify-between p-0 transition-opacity duration-300 ${showControls ? "bg-radial from-transparent via-black/5  to-black" : "bg-transparent"}`}
      >

      <div className={`z-30 flex justify-start transition-transform duration-300 ${showControls ? "translate-y-0" : "-translate-y-full"}`}>
        {/* Logo */}
      {nowPlaying?.logo_path?
        <img
          src={`${LOGO_BASE_URL}${nowPlaying.logo_path}`}
          alt={nowPlaying.title}
          className="object-contain select-none h-18 logo p-3"
        />
    :    
          <h2 className="text-2xl font-bold text-white h-12">{nowPlaying?.title}</h2>
        }
      </div>
        <div tabindex={"-1"} className='opacity-100 w-full h-full transition focus:outline-none focus:border-transparent focus:ring-0'
        onClick={(event) => setShowControls((prev) =>  !prev)}
        onDoubleClick={ () => {
          setShowControls(false)
          toggleFullscreen()
        }}
        >

{showVolume && 
<div className="opacity-unset ml-auto mr-16 mt-16 w-4 h-1/2 border border-white bg-black/50 relative overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-white/90 transition-all"
          style={{ height: `${volume * 100 }%` }}
          ></div>
      </div>

        }
        </div>
        <div className={`py-4 pt-6 select-none transition-transform duration-300 ${showControls ? "translate-y-0" : "translate-y-full"}`}>

          { playerRef.current && 
          <p className='text-right text-white px-8 py-2 bg-transparent'>
            {currentTime} &nbsp;/&nbsp; {duration}
          </p>
          }

      <div className={`select-none z-40 flex flex-row gap-3 transition-transform duration-300`}>
        {/* Play/Pause Button */}
      <button
        onClick={togglePlay}

        className="p-3 bg-black/50 rounded-full backdrop-blur-md hover:bg-white/30"
        >
        {playing ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><polygon points="5,3 19,12 5,21" /></svg>
        )}
      </button>

      <button
        onClick={toggleMute}
        className="p-3 bg-black/50 rounded-full backdrop-blur-md hover:bg-white/30 transition"
        >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
        )}
      </button>

          {/* Progress Bar (Placeholder) */}
        <div className="flex justify-between items-center w-full">
        <input
        id="progress-bar"
        type="range"
        min="0"
        max="1"
            step="0.01"
            value={played}
            onChange={handleSeek}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="myinput flex-grow cursor-pointer h-1 transition accent-red-600"
          />
      </div>

      <button className="p-3 bg-black/50 rounded-full backdrop-blur-md hover:bg-white/30 transition">
     
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-320h320v-80H240v80Zm400 0h80v-80h-80v80ZM240-480h80v-80h-80v80Zm160 0h320v-80H400v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>
          
        </button>

      
        {/* Fullscreen Button */}
  
        <button className="px-auto p-3 bg-black/50 rounded-full backdrop-blur-md hover:bg-white/30 transition" onClick={toggleFullscreen}>
          {fullscreen? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#e3e3e3"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>
          )}
        </button>


      </div>
        </div>
    </div>

    </div>

    }
  </>
  );
}


export default Player;
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MovieDetails from "./window/MovieDetails";
import MovieGrid from "./window/MovieGrid";
import SearchGrid from "./window/SearchGrid";
import TvDetails from "./window/TvDetails";
import TvGrid from "./window/TvGrid";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const renderSwitch = ({focused, menu, setMenu, selected, setVideoUrl, setNowPlaying, setSelected, loading, setLoading, setFocused}) => {

  switch (menu) {
    case 'movie-info':
      return <MovieDetails movie = {selected} setVideoUrl={setVideoUrl} setNowPlaying={setNowPlaying} setLoading={setLoading} />;        
    case 'movie':
      return <MovieGrid focused={focused} setFocused={setFocused}  menu={menu} setMenu={setMenu} loading={loading} setLoading={setLoading} setSelected={setSelected}/>;            
    case 'tv':
      return <TvGrid focused={focused} setFocused={setFocused} menu={menu} setMenu={setMenu} loading={loading} setLoading={setLoading} setSelected={setSelected}/>;            
    case 'tv-info':
      return <TvDetails tvShow = {selected} setVideoUrl={setVideoUrl} setNowPlaying={setNowPlaying}  />;        
    case 'search':
      return <SearchGrid focused={focused} setFocused={setFocused} menu={menu} setSelected={setSelected} setMenu={setMenu} loading={loading} setLoading={setLoading} />;    
    default:
      break;
  }
}

const Window = ({setBackdrop, setNowPlaying, setLoading, setVideoUrl, loading, fullscreenMode, setFullscreenMode}) => {


  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState('movie')
  const [focused, setFocused] = useState(null)


  useEffect(() => {

    if(focused) {
      const item = {'img': `${BACKDROP_BASE_URL}${focused.backdrop_path}`, 'title': focused.title}
      setBackdrop(item)
    }
  },[focused, setBackdrop])

  return (
    <>
      <Navbar menu={menu} setMenu={setMenu}/>
      <div className="absolute h-full md:pt-20 mt-6">
        { renderSwitch({focused, menu, setMenu, selected, setVideoUrl, setNowPlaying, setSelected, loading, setLoading, setFocused}) }
      </div>
        </>
  );
};

export default Window;
import Loading from './Loading';
import Player from './Player';


      const Backdrop = ( { setFullscreenMode, children , backdrop, loading, videoUrl,setLoading, nowPlaying }) => {


  return (
        <>

{videoUrl ? 
<Player videoUrl={videoUrl} setLoading={setLoading} setFullscreenMode={setFullscreenMode} nowPlaying={nowPlaying} />

:
<>

{backdrop  &&
<div className='fixed top-0 h-screen w-full transition-all duration-300 bg-cover bg-center' style={{backgroundImage:`url(${backdrop.img})` }}> </div>

}
  </>
}

<div className="fixed h-screen w-screen bg-linear-to-b from-black via-black/40 via-black/20 to-black/90"></div>

    {children}
  {loading && <Loading />}
  
  </>


  );
};

export default Backdrop;

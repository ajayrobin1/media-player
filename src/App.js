import React, {  useEffect, useState } from 'react';
import Window from './components/Window';
import Backdrop from './components/Backdrop';
import Modal from './components/Modal';
import './App.css' 
import IPInputModal from './components/IPInputModal';

function App() {
  
  const [backdrop, setBackdrop] = useState({})
  const [nowPlaying, setNowPlaying] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieLinkList, setMovieLinkList] = useState([]);
  const [loading, setLoading] = useState(false);

  
  
  const localAddress = localStorage.getItem('server-address')

  const [ipModalOpen, setIpModalOpen] = useState(!localAddress); 
  const [serverAddress, setServerAddress] = useState(localAddress);

  
  const listLength = movieLinkList.length;

  sessionStorage.setItem('menu', 'movies')


  useEffect(() =>{
    if(listLength >= 1) setIsModalOpen(true)
  },[listLength])


return (
    <div className="App">


      <Backdrop  nowPlaying = {nowPlaying} loading={loading} backdrop={backdrop} videoUrl={videoUrl} setLoading={setLoading}> 
{serverAddress === null && 
       
       <IPInputModal
         isOpen={ipModalOpen}
         onClose={() => setIpModalOpen(false)}
         onConfirm={(ip) => setServerAddress(ip)}
         />
       
       }

        {! videoUrl && !ipModalOpen &&
          <Window 
          setNowPlaying={setNowPlaying}
         loading = {loading}
          setBackdrop={setBackdrop} setVideoUrl={setVideoUrl} setLoading={setLoading} setIsModalOpen={setIsModalOpen} setMovieLinkList={setMovieLinkList} />
        }
          <Modal isOpen={isModalOpen}

          setVideoUrl={setVideoUrl}

          setLoading={setLoading}
          
          onClose={() => { 
            setIsModalOpen(false)
            setMovieLinkList([])
          }} 
          movieLinkList={movieLinkList} />

       </Backdrop>
    </div>
  );
}

export default App;

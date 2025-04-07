let audioContext;

const  enhanceAudio =  (videoRef) => {

  const videoElement = videoRef.getInternalPlayer();    
    // Ensure only one AudioContext is created
  
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Extract audio from video element
    const sourceNode = audioContext.createMediaElementSource(videoElement);

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 5; // Volume Boost

      const highPassFilter = audioContext.createBiquadFilter();
      highPassFilter.type = "highpass";
      highPassFilter.frequency.value = 100; // Cut below 100Hz

      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -40;
      compressor.knee.value = 10;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.01;
      compressor.release.value = 0.1;


      sourceNode.connect(highPassFilter);
      highPassFilter.connect(compressor);
      compressor.connect(audioContext.destination);

      // 🔄 Connect nodes
      console.log("Audio Enhanced!");

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
  }

  export default enhanceAudio;
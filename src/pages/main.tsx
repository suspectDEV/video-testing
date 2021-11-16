import { useRef, useEffect, useContext } from 'react';
import { PeerContext } from '../context/peer';
import PEER_JS from '../context/peerConnection';

export default function Main() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        // @ts-ignore
        // FIXME: HtmlVideoElement
        videoRef.current.srcObject = stream;
        PEER_JS.on('call', call =>{
          console.log("estoy recibiendo una llamada")
          call.answer(stream)
        })
        
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
    init();
  }, []);

  function init(){

  }

  return (
    <div>
      <h1>Transmitiendo...</h1>
      <video 
        ref={videoRef}
        autoPlay
      />
    </div>
  );
}

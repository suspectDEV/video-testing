import { useRef, useEffect } from 'react';

export default function Main() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        // @ts-ignore
        videoRef.current.srcObject = stream;
        
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, []);

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

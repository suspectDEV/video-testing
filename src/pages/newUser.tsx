import React, { ChangeEvent, useState, useContext, useRef } from "react";
import { PeerContext } from "../context/peer";
import PEER_JS from "../context/peerConnection";

function NewUser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inputValue, setInputValue] = useState("");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
    event.preventDefault();
  }

  const VIDEO = document.getElementById("video-invitado") as HTMLVideoElement;

  function openVideo() {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        var call = PEER_JS.call(inputValue, stream);
        call.on('stream', remoteStream =>{
          // @ts-ignore
          // FIXME: HtmlVideoElement
          videoRef.current.srcObject = remoteStream;
          videoRef.current?.play()
        })
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }

  return (
    <>
      <h1>New User:</h1>
      <button onClick={openVideo}>Open Video</button>
      <input
        type="text"
        placeholder="Id para conectar"
        value={inputValue}
        onChange={handleInput}
      />
      <br />
      <h1>Visitando usuario</h1>
      <video id="video-invitado" ref={videoRef} autoPlay height="300"></video>
    </>
  );
}

export default NewUser;

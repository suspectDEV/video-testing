import Peer from "peerjs";
import React, { ChangeEvent, useState } from "react";

const peerjs = new Peer(undefined, {
  host: "192.168.1.4",
  port: 3001,
});

function NewUser() {

  const [inputValue, setInputValue] = useState("")

  function handleInput(event: React.ChangeEvent<HTMLInputElement>){
    setInputValue(event.currentTarget.value)
    event.preventDefault()
  }

  const VIDEO = document.getElementById("video-invitado") as HTMLVideoElement;
  
  function openVideo() {
    console.log("estamos pulsando el boton")
      navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log("estamos en el metodo")
        var call = peerjs.call(inputValue, stream);
        call.on("stream", remoteStream => {
          // Show stream in some video/canvas element.
          console.log("Recibo datos: " , remoteStream)
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  return (
    <>
      <h1>New User:</h1>
      <button onClick={openVideo}>Open Video</button>
      <input type="text" placeholder="Id para conectar" value={inputValue} onChange={handleInput} />
      <br />
      <h1>Viendo pantalla</h1>
      <video id="video-invitado" height="300"></video>
    </>
  );

}

export default NewUser;

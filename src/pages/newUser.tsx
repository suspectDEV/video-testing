import Peer from "peerjs";
import React, { ChangeEvent, useState } from "react";

// function connectToUser(userId: string, stream: MediaStream) {
//   const call = peerjs.call(userId, stream);
//   call.on("stream", (userVideoStream) => {
//     console.log(userVideoStream);
//   });
// }

const peerjs = new Peer(undefined, {
  host: "/",
  port: 3001,
});

function NewUser() {

  const [inputValue, setInputValue] = useState("")

  function handleInput(event: React.ChangeEvent<HTMLInputElement>){
    setInputValue(event.currentTarget.value)
    event.preventDefault()
  }

  function openVideo() {
    const peers = {};
    const VIDEO = document.getElementById("video-invitado") as HTMLVideoElement;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        VIDEO.srcObject = stream;
        VIDEO?.addEventListener("loadedmetadata", () => {
          VIDEO.play();
        });
        // onPeer(stream);
  
        const call = peerjs.call(inputValue, stream);
        call.on("stream",remoteStream=>{
          console.log("conectado", remoteStream)
        })
      });
  }

  return (
    <>
      <h1>New User:</h1>
      <button onClick={openVideo}>Open Video</button>
      <input type="text" placeholder="Id para conectar" value={inputValue} onChange={handleInput} />
      <br />
      <video id="video-invitado" height="300"></video>
    </>
  );

}

export default NewUser;

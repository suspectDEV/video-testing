import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { useEffect, useState } from "react";

const peerjs = new Peer(undefined, {
  host: "192.168.1.4",
  port: 3001,
});

function Main() {

  const [notiVal, setNotiVal] = useState("")

  useEffect(() => {
    onPeer()
  }, []);

  // function readVideo() {
  //   const peers = {};
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     .then((stream) => {
  //       onPeer(stream);
  //     })
  //     .catch(reason => {
  //       console.log(reason)
  //     })
  // }

  function onPeer() {
    const VIDEO = document.getElementById("video") as HTMLVideoElement;

    peerjs.on("call", (call) => {
      noti("Un usuario se ha conectado")
      console.log("call", call)
      
      
      // ..Recibo datos de llamada
      call.answer();
      call.on("stream", dataRecibida =>{
        console.log("data", dataRecibida)
        VIDEO.srcObject = dataRecibida;
        VIDEO?.addEventListener("loadedmetadata", () => {
          console.log("Acá está listo el video")
          // VIDEO.play();
        });

      })

      
      // call.on("stream", (userVideoStream) => {
      //   // Este es el source del otro video
      //   console.log("reading call stream");
      //   console.log(userVideoStream);
      // })
    })
  }

  function noti(msg : string){
    setNotiVal(msg)
  }

  return (
    <>
      <h1>Hello video</h1>
      <small>{notiVal}</small>
      <div id="videoGrid">
        <video id="video" width="200" controls></video>
      </div>
    </>
  );
}

export default Main;

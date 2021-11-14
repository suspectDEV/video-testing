import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { useEffect, useState } from "react";

const peerjs = new Peer(undefined, {
  host: "192.168.1.4",
  port: 3001,
});

function Main() {
  const [notiVal, setNotiVal] = useState("");

  useEffect(() => {
    init();
  }, []);

  const VIDEO = document.getElementById("video") as HTMLVideoElement;

  function init() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        var call = peerjs.call("another-peers-id", stream);
        console.log(stream.id)
        call.on("stream", function (remoteStream) {
          // Show stream in some video/canvas element.
          console.log("Recibo datos: " , remoteStream)
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  function noti(msg: string) {
    setNotiVal(msg);
  }

  return (
    <>
      <h1>Hello video</h1>
      <small>{notiVal}</small>
      {/* <div id="videoGrid">
        <video id="video" width="200" controls></video>
      </div> */}
    </>
  );
}

export default Main;

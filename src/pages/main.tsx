import { useContext, useEffect, useState } from "react";
import { PeerContext } from "../context/peer";

function Main() {

  const peer = useContext(PeerContext)
  const [notiVal, setNotiVal] = useState("");

  useEffect(() => {
    init();
  }, []);

  const VIDEO = document.getElementById("video") as HTMLVideoElement;

  function init() {
    console.log(peer)
  }

  function noti(msg: string) {
    setNotiVal(msg);
  }

  return (
    <>
      <h1>Hello video</h1>
      <small>{notiVal}</small>
      <div id="videoGrid">
        <video id="video"></video>
      </div>
    </>
  );
}

export default Main;

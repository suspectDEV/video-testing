import { useEffect, useState } from "react";

function Main() {
  const [notiVal, setNotiVal] = useState("");

  useEffect(() => {
    init();
  }, []);

  const VIDEO = document.getElementById("video") as HTMLVideoElement;

  function init() {
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

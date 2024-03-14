import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ data, className = '', ...props }) {
  const videoRef = useRef();

  useEffect(()=>{
    const hls = new Hls({
      "debug": true
    });

    if (Hls.isSupported()) {
      hls.log = true;
      hls.loadSource = data.src;
      hls.attachMedia(videoRef.current)
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err)
      });

    } else {
      console.log('load')
    }
  },[data])

  return (
    <video
      ref={videoRef}
      controls
      {...props}
      src={data.src}
      className={className}
    />
  )
}
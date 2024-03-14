import Head from "next/head"
import MuxPlayer from '@mux/mux-player-react';
import React, { useState } from "react"
import VideoPlayer from "./VideoPlayer";

const VideoTest = () => {
  const [hlsUrl, setHlsUrl] = useState(
    "https://stream.mux.com/RsGZVd1Hw8TbFUDgkaa4CwT402LDBvqw5OEQzzI3nSgM.m3u8"
  );
  return (
    <>
      <Head>
        <title>ScoreConnect Video Test</title>
      </Head>
      <div>

        <div id="video-container" className="w-2/3 mx-auto">

          <VideoPlayer
            data={{
              src: hlsUrl,
            }}
            className="w-full"
          />

      
          <MuxPlayer
            streamType="on-demand"
            playbackId="RsGZVd1Hw8TbFUDgkaa4CwT402LDBvqw5OEQzzI3nSgM"
            metadataVideoTitle="Placeholder (optional)"
            metadataViewerUserId="Placeholder (optional)"
            primaryColor="#FFFFFF"
            secondaryColor="#000000"
            autoPlay={true}
          />


          <video
            id="video"
            controls
            preload="auto"
            width="640"
            height="264"
            src="https://stream.mux.com/RsGZVd1Hw8TbFUDgkaa4CwT402LDBvqw5OEQzzI3nSgM.m3u8"
          ></video>

        </div>

      </div>
    </>
  )
}

export default VideoTest

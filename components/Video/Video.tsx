'use client';

import MuxPlayer from '@mux/mux-player-react';

type Params = {
    playbackId: string;
  };
  

export default function Page({ params: { playbackId } }: { params: Params }) {
    return (
        <MuxPlayer
          playbackId={playbackId}
          poster="https://image.mux.com/{playbackId}/thumbnail.jpg?width=1920"
          style={{ width: '100%', height: '100%' }}
        />
      );
}

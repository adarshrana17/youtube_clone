import React from 'react';
import { useParams } from 'react-router-dom';
import videos from '../utlis/mockdata';
import VideoPlayback from './VideoPlayback';

function Video() {
  const { id } = useParams(); 

  const selectedVideo = videos.find((video) => video.id === Number(id));

  if (!selectedVideo) {
    return <h2 className="text-center text-red-500">Video not found</h2>;
  }

  return (
    <div>
      <VideoPlayback videoDetail={selectedVideo} />
    </div>
  );
}

export default Video;

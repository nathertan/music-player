import React, {useState} from "react";
// import DefaultPlayer from "./components/YoutubePlayer";
import Player from "./components/Player";
import Playlist from "./components/playlist";
import "./index.css";

const App: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<{ videoId: string; title: string } | null>(null);

  // //move to next video 
  // const nextVideo = () => {
  // setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  // console.log(nextVideo);
  // };
  
  return (
    <div className="app">
      <h1>
        {currentVideo ? `Now Playing: ${currentVideo.title}` : "Select a video to play"}
      </h1>
      <div className="player-wrapper">
      {currentVideo ? (
        <Player videoId={currentVideo.videoId} /> // Pass the selected videoId to Player
      ) : (
        <p>Select a video to play</p>
      )}
      </div>
      <Playlist onVideoSelect={setCurrentVideo} />
    </div>
  );
};

export default App;
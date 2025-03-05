import React, {useState} from "react";
import Player from "./components/Player";
import Playlist from "./components/playlist";
import "./index.css";
import YouTubePlayer from "react-player/youtube";

const App: React.FC = () => {
  const[currentVideo, setCurrentVideo] = useState<string | null>(null);

  return (
    <div className="app">
      <h1>Music Player</h1>
      {currentVideo ? <YouTubePlayer videoId={currentVideo} /> : <p>Select a video to play</p>}
      <Playlist onVideoSelect={setCurrentVideo} />
    </div>
  );
};

export default App;
import React, {useState} from "react";
import DefaultPlayer from "./components/YoutubePlayer";
import Player from "./components/Player";
import Playlist from "./components/playlist";
import "./index.css";

const App: React.FC = () => {
  const[currentVideo, setCurrentVideo] = useState<string | null>(null);

  return (
    <div className="app">
      <h1>Kamu Wibu</h1>
      {currentVideo ? <DefaultPlayer videoId={currentVideo} /> : <p>Select a video to play</p>}
      {currentVideo ? <Player videoId={currentVideo} /> : <p>Select a video to play</p>}
      <Playlist onVideoSelect={setCurrentVideo} />
    </div>
  );
};

export default App;
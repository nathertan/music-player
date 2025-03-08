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
  const getNextVideo = (currentVideoId: string) => {
    const playlistItems = document.querySelectorAll(".playlist-item");
    let found = false;

    for (let item of playlistItems) {
      if (found) {
        return {
          videoId: item.getAttribute("data-videoid")!,
          title: item.getAttribute("data-title")!,
        };
      }
      if (item.getAttribute("data-videoid") === currentVideoId) {
        found = true;
      }
    }
    return null;
  };
  
  return (
    <div className="app">
      <h1>
        {currentVideo ? `Now Playing: ${currentVideo.title}` : "Select a video to play"}
      </h1>
      <div className="player-wrapper">
      {currentVideo ? (
        <Player videoId={currentVideo.videoId} 
          onNext={() => {
            const nextVideo = getNextVideo(currentVideo.videoId);
            if(nextVideo) {
              setCurrentVideo(nextVideo);
            }
          }}
        /> // Pass the selected videoId to Player
      ) : (
        <p>Select a video to play</p>
      )}
      </div>
      <Playlist onVideoSelect={setCurrentVideo} getNextVideo={getNextVideo} />
    </div>
  );
};

export default App;
import React, { useEffect, useState } from "react";
// import DefaultPlayer from "./components/YoutubePlayer";
import Player from "./components/Player";
import Playlist from "./components/playlist";
import "./index.css";

const App: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<{ videoId: string; title: string } | null>(null);
  // dark mode toggle, todo: learn state management
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

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

  const DarkModeToggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  };

  return (
    //embedding darkMode to app class so it could be used globally
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <button onClick={DarkModeToggle} className="dark-mode">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="app-wrapper">
        <div className="player-wrapper">
          <h1>
            {currentVideo ? `Now Playing: ${currentVideo.title}` : "Select a video to play"}
          </h1>
          <div className="player">
            {currentVideo ? (
              <Player videoId={currentVideo.videoId}
                onNext={() => {
                  const nextVideo = getNextVideo(currentVideo.videoId);
                  if (nextVideo) {
                    setCurrentVideo(nextVideo);
                  }
                }}
              /> // Pass the selected videoId to Player
            ) : (
              <p>Select a video to play</p>
            )}
          </div>
        </div>
        <Playlist onVideoSelect={setCurrentVideo} getNextVideo={getNextVideo} />
      </div>
    </div>
  );
};

export default App;
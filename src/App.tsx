import React, { useEffect, useState } from "react";
import Player from "./components/Player";
import Playlist from "./components/playlist";
import "./index.css";

const App: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<{ videoId: string; title: string; thumbnail: string } | null>(null);
  // dark mode toggle, todo: learn state management

  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");

  const inputPlaylist = () => {
    const match = userInput.match(/(?:list=)([a-zA-Z0-9_-]+)/);
    if (match) {
      setPlaylistId(match[1]);
    } else {
      alert("invalid playlist link, please enter valid youtube playlist URL")
    }
  }

  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true"
  );

  // use Effect modification so it would add and remove "dark" from local storage, so there are no doubles.
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Function to find which video is next, it loops through playlist items, it tries to match the current videoId with the list, if matched, it will break the loop on the next iteration and returns the next videoID to be passed through 
  const getNextVideo = (currentVideoId: string) => {
    const playlistItems = document.querySelectorAll(".playlist-item");
    let found = false;

    for (let item of playlistItems) {
      if (found) {
        return {
          videoId: item.getAttribute("data-videoid")!,
          title: item.getAttribute("data-title")!,
          thumbnail: item.getAttribute("data-thumbnail")!,
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
      {/* Button for toggling dark mode */}
      <button onClick={DarkModeToggle} className="dark-mode">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="app-wrapper">
        <div className="player-wrapper">
          {/* If else, If theres a video playing it shows title, if theres not it asks for user to select a video from the playlist */}
          <div className="player-thumbnail">
            {currentVideo && (
              <img src={currentVideo.thumbnail} alt={currentVideo.title} className="thumbnail" />
            )}
          </div>

          <div className="player-header">
            {!playlistId ? (
              <div className="playlist-input">
                <h2>Enter Youtube Playlist Link:</h2>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Paste Playlist URL here..."
                />
                <button onClick={inputPlaylist}>Load Playlist</button>
              </div>
            ) : (
              <>
                <div className="player">
                  <h1>{currentVideo ? currentVideo.title : "Select a video to play"}</h1>
                  {currentVideo &&
                    <Player
                      videoId={currentVideo.videoId}
                      onNext={() => {
                        //use nextVideo to get next videoId
                        const nextVideo = getNextVideo(currentVideo.videoId);
                        // Pass the selected videoId to Player
                        if (nextVideo) {
                          setCurrentVideo(nextVideo);
                        }
                      }}
                    />
                  }
                </div>
                <div className="playlist-wrapper">
                  <span>Next on List:</span>
                  <Playlist
                    onVideoSelect={setCurrentVideo}
                    getNextVideo={getNextVideo}
                  />
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
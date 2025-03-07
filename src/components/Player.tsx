import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
    videoId: string;
  }

const Player: React.FC<PlayerProps> = ({ videoId }) => {

    const playerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    
    //Play/pause toggle
    const togglePlayPause = () => {
        setPlaying((prev) => !prev);
    };
 
    //Progress bar
    const handleProgress = (state: { played: number}) => {
        setProgress(state.played * 100);
    };
 
    //Seeking on progress bar
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!playerRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * 100;
        setProgress(newTime);
        playerRef.current.seekTo(newTime / 100);
    };

    //autoplaying new video and resets progress bar
    useEffect(() => {
        setProgress(0);
        setPlaying(true); //autoplays new vid
    }, [videoId]);

    return (
        <div className="custom-player">
            {/* Hidden youtube player */}
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                playing={playing}
                controls={false} // hide default controls
                //hide video
                width="0px"
                height="0px"
                onProgress={handleProgress}
            />

            {/* New controls */}
            <div className="controls">
                <button onClick={togglePlayPause} className="playButton">
                    {playing ? "Pause" : "Play"}
                </button>

                <div className="progress-bar" onClick={handleSeek}>
                    <div className="progress" style={{ width: `${progress}%`}}></div>
                </div>

            </div>

        </div>
    );
};

export default Player;
import React from "react";
import ReactPlayer from "react-player";

interface YoutubePlayerProps {
    videoId: string;
}

const Player: React.FC<YoutubePlayerProps> = ({ videoId }) => {
    return (
        <div className="player-container">
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                playing
                width="100%"
                height="0px"
                style={{ minHeight: "40px" }}
            />
        </div>
    );
};

export default Player;
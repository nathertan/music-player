import React, { useEffect, useState } from "react";
import axios from "axios";

interface Video {
    title: string;
    videoId: string;
    thumbnail: string;
}

interface PlaylistProps {
    playlistId: string | null;
    onVideoSelect: (videoId: { videoId: string; title: string; thumbnail: string; }) => void;
    getNextVideo: (currentVideoid: string) => { videoId: string; title: string } | null;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
// const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

const Playlist: React.FC<PlaylistProps> = ({ playlistId, onVideoSelect }) => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        if (!playlistId) return;

        const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=${playlistId}&key=${API_KEY}`;

        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(API_URL);
                let fetchedVideos = response.data.items.map((item: any) => {
                    const thumbnails = item.snippet.thumbnails;
                    const thumbnailUrl =
                        thumbnails.standard?.url ||
                        thumbnails.high?.url ||
                        thumbnails.medium?.url ||
                        thumbnails.default?.url ||
                        '';
                    return {
                        title: item.snippet.title,
                        videoId: item.snippet.resourceId.videoId,
                        thumbnail: thumbnailUrl,
                    }
                });

                //shuffling playlist
                let shuffledVideos = fetchedVideos.sort(() => Math.random() - 0.5);
                setVideos(shuffledVideos);

                if (shuffledVideos.length > 0) {
                    onVideoSelect(shuffledVideos[0]);
                }
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };
        //run the playlist get
        fetchPlaylist();

    }, []);

    return (
        <div className="playlist">
            {videos.map((video) => (
                <div
                    key={video.videoId}
                    className="playlist-item"
                    data-videoid={video.videoId}
                    data-title={video.title}
                    data-thumbnail={video.thumbnail}
                    onClick={() => onVideoSelect({ videoId: video.videoId, title: video.title, thumbnail: video.thumbnail })}>
                    <img src={video.thumbnail} alt={video.title} />
                    <p>{video.title}</p>
                </div>
            ))}
        </div>
    );
};


export default Playlist;
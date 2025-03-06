import React, { useEffect, useState} from "react";
import axios from "axios";

interface Video {
    title: string;
    videoId: string;
    thumbnail: string;
}

interface PlaylistProps {
    onVideoSelect: (videoId: string) => void;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
// console.log(API_KEY);
// console.log(PLAYLIST_ID);
console.log(API_URL);

const Playlist: React.FC<PlaylistProps> = ({ onVideoSelect }) => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(API_URL);
                let fetchedVideos = response.data.items.map((item: any) => ({
                    title: item.snippet.title,
                    videoId: item.snippet.resourceId.videoId,
                    thumbnail: item.snippet.thumbnails.standard.url,
                }));

                //shuffling playlist
                fetchedVideos = fetchedVideos.sort(() => Math.random() - 0.5);
                setVideos(fetchedVideos);
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
                <div key ={video.videoId} className="playlist-item" onClick={() => onVideoSelect(video.videoId)}>
                    <img src={video.thumbnail} alt={video.title}g />
                    <p>{video.title}</p>
                </div>
            ))}
        </div>
    );
};


export default Playlist;
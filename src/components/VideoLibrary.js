import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./VideoLibrary.css";

// ✅ Helper to extract YouTube ID
const getYouTubeId = (url) => {
  const regExp =
    /(?:youtube\.com.*(?:\?v=|\/embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-library">
      <h2 className="library-title">🎬 Video Library</h2>
      {videos.length === 0 ? (
        <p className="empty-msg">No videos available.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video._id}>
              <div className="video-thumb">
                {getYouTubeId(video.url) ? (
                  <iframe
                    width="100%"
                    height="150"
                    src={`https://www.youtube.com/embed/${getYouTubeId(
                      video.url
                    )}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                ) : (
                  <video width="100%" height="150" controls muted>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <h4 className="video-title">{video.title}</h4>
              <Link className="watch-btn" to={`/player/${video._id}`}>
                ▶ Watch Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;

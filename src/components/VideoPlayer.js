import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import "./VideoPlayer.css";

const VideoPlayer = ({ userId, videoId }) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [lastWatchedTime, setLastWatchedTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/video/${videoId}`);
        setVideoUrl(response.data.url);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      }
    };
    fetchVideoUrl();
  }, [videoId]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/progress/${userId}/${videoId}`);
        setWatchedIntervals(response.data.watchedIntervals);
        setLastWatchedTime(response.data.lastWatchedTime);
        setProgressPercent(response.data.progressPercent);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };
    fetchProgress();
  }, [userId, videoId]);

  const handleProgress = (progress) => {
    const { playedSeconds } = progress;

    if (playedSeconds > lastWatchedTime) {
      const newInterval = [lastWatchedTime, playedSeconds];
      setWatchedIntervals((prev) => [...prev, newInterval]);
      setLastWatchedTime(playedSeconds);

      const totalWatchedTime = [...watchedIntervals, newInterval].reduce(
        (sum, interval) => sum + (interval[1] - interval[0]),
        0
      );
      const uniqueProgress = Math.round((totalWatchedTime / videoDuration) * 100);
      setProgressPercent(uniqueProgress);

      axios.post("http://localhost:5000/progress/update", {
        userId,
        videoId,
        watchedIntervals: [newInterval],
        lastWatchedTime: playedSeconds,
        videoDuration,
      });
    }
  };

  return (
    <motion.div
      className="video-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="video-title">🎥 Video Progress Tracker</h2>
      </div>

      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={videoUrl}
          onDuration={(duration) => setVideoDuration(duration)}
          onProgress={handleProgress}
          playing
          controls
          width="100%"
          height="100%"
        />
      </div>

      <ProgressBar progressPercent={progressPercent} />
    </motion.div>
  );
};

export default VideoPlayer;

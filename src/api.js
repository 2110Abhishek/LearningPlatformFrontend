import axios from "axios";

export const fetchProgress = async (userId, videoId) => {
  try {
    const response = await axios.get(`http://localhost:5000/progress/${userId}/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
  }
};

export const updateProgress = async (userId, videoId, watchedIntervals, lastWatchedTime, videoDuration) => {
  try {
    await axios.post("http://localhost:5000/progress/update", {
      userId,
      videoId,
      watchedIntervals,
      lastWatchedTime,
      videoDuration,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};

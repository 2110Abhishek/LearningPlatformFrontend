import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please provide both a title and a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);       
    formData.append("video", file);       
    try {
      await axios.post("http://localhost:5000/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video uploaded!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUpload;

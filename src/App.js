import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoLibrary from "./components/VideoLibrary";
import VideoUpload from "./components/VideoUpload";
import VideoPlayer from "./components/VideoPlayer";  // needed for the wrapper

import { useParams } from "react-router-dom";

// VideoPlayerWrapper definition here
function VideoPlayerWrapper() {
  const { videoId } = useParams();
  const userId = "user123";  // hardcoded for now — can be dynamic later
  return <VideoPlayer userId={userId} videoId={videoId} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoLibrary />} />
        <Route path="/upload" element={<VideoUpload />} />
        <Route path="/player/:videoId" element={<VideoPlayerWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;

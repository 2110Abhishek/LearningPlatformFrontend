import React from "react";
import { motion } from "framer-motion";
import "./ProgressBar.css";

const ProgressBar = ({ progressPercent }) => {
  return (
    <div className="progress-wrapper">
      <h3 className="progress-label">Progress: {progressPercent}%</h3>
      <div className="progress-bar-bg">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

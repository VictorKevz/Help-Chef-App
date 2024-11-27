import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../measuresYoutube.css";
import { verticalVariants } from "../../../variants";
function YoutubeVideo({ url }) {
  const convertToEmbedUrl = (originalUrl) => {
    const videoId = originalUrl?.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const embedUrl = convertToEmbedUrl(url);

  return (
    
    <motion.div
      className="yt-video-wrapper"
      variants={verticalVariants("bottom")}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      exit="exit"
      key={embedUrl}
    >
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        className="iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </motion.div>
  );
}

export default YoutubeVideo;

import React from "react";
import "../measuresYoutube.css"
function YoutubeVideo({ url }) {
  const convertToEmbedUrl = (originalUrl) => {
    const videoId = originalUrl?.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const embedUrl = convertToEmbedUrl(url);

  return (
    <div  className="yt-video-wrapper">
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        className="iframe"
        
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YoutubeVideo;
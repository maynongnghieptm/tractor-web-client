import React from "react";
import ReactDOM from "react-dom";
import VideoPlayer from "react-background-video-player";
import BasePageContainer from "_common/BasePageContainer";
import Dashboard from "../../Dashboard/Dashboard" 
function Background_vid() {
  return (
<div style={{ width: '100vw', height: '100vh' }}>
  <div className="bg">
    <VideoPlayer
      className="video"
      src={
        "/video-banner.mp4"
       // "https://player.vimeo.com/external/435674703.sd.mp4?s=01ad1ba21dc72c1d34728e1b77983805b34daad7&profile_id=165&oauth2_token_id=57447761"
      }
      autoPlay={true}
      muted={true}
      style={{ width: '100%', height: '100%' }}
    />
  </div>
  
</div>
  
   
   
  );
}

export default Background_vid

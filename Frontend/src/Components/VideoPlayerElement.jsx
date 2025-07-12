import React, { useEffect, useRef } from 'react';

const VideoPlayerElement = ({
  videoUrl,
  onPlay,
  onLoadedMetadata,
  onCanPlay,
  onTimeUpdate,
  toggleFullScreen,
  onWaiting,
  onPlaying,
  onPause,
  videoRef
}) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      videoRef.current?.removeAttribute('controls');
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [videoRef]);

  return (
    <div className="relative  w-full ">
      <video
        ref={videoRef}
        onPlay={onPlay}
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onDoubleClick={toggleFullScreen}
        onWaiting={onWaiting}
        onPlaying={onPlaying}
        onPause={onPause}
        className="w-full   rounded-xl"
        src={videoUrl}
        controls={false}
        height="100%"
      />
    </div>
  );
};

export default VideoPlayerElement;

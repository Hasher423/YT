// Components/VideoWrapper.jsx
import React, { useEffect } from 'react';

const VideoWrapper = ({
  videoRef,
  videoUrl,
  onPlay,
  onLoadedMetadata,
  onCanPlay,
  onTimeUpdate,
  onDoubleClick,
}) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      videoRef.current?.removeAttribute('controls');
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [videoRef]);

  return (
    <div className="video w-full sm:h-full">
      <video
        ref={videoRef}
        onPlay={onPlay}
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onDoubleClick={onDoubleClick}
        className="w-full h-full rounded-xl"
        src={videoUrl}
        height="100%"
      />
    </div>
  );
};

export default VideoWrapper;

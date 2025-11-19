// VideoPlayerElement.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDuration,
  setVideoStarted,
  setCurrentTime,
  setLoading,
  setPlaying,
} from '../redux/features/videoSlice';
import Hls from 'hls.js';

const VideoPlayerElement = ({ videoRef }) => {
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.video);
  const hlsRef = useRef(null);

  // Get the HLS URL from Cloudinary response
  const hlsUrl = videoData?.video?.video_Url?.playback_url; // ← This is your .m3u8
  const fallbackMp4 = videoData?.video?.video_Url?.secure_url;

  useEffect(() => {
    if (!videoRef.current || !hlsUrl) return;

    const video = videoRef.current;
    let hls;

    // Show loading immediately
    dispatch(setLoading(true));

    // Native HLS (Safari/iOS)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        dispatch(setDuration(video.duration));
      });
      video.play().catch(() => console.log("Autoplay prevented"));
    }
    // HLS.js for Chrome, Firefox, Android
    else if (Hls.isSupported()) {
      hls = new Hls({
        startLevel: 9,
        capLevelToPlayerSize: true,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
        maxBufferLength: 30,
        liveSyncDurationCount: 3,
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        dispatch(setDuration(video.duration));
        video.muted = true;
        video.play().catch(() => console.log("Autoplay blocked"));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS fatal error:', data);
          // Fallback to direct MP4
          video.src = fallbackMp4;
          video.play();
        }
      });
    }
    // Very old browsers → fallback to MP4
    else {
      video.src = fallbackMp4;
      video.addEventListener('loadedmetadata', () => {
        dispatch(setDuration(video.duration));
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [hlsUrl, fallbackMp4, videoRef, dispatch]);

  // Fullscreen handler (unchanged)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        videoRef.current?.removeAttribute('controls');
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [videoRef]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-full md:mt-[3vh] mt-2">
      <video
        ref={videoRef}
        className="w-full rounded-xl bg-black"
        controls={false}
        autoPlay
        playsInline
        muted
        preload="metadata"
        onPlay={() => {
          dispatch(setPlaying(true));
          dispatch(setVideoStarted(true));
        }}
        onPause={() => dispatch(setPlaying(false))}
        onTimeUpdate={() => dispatch(setCurrentTime(videoRef.current?.currentTime || 0))}
        onWaiting={() => dispatch(setLoading(true))}
        onPlaying={() => dispatch(setLoading(false))}
        onCanPlay={() => dispatch(setLoading(false))}
        onDoubleClick={toggleFullScreen}
        onClick={(e) => e.target.pause?.()} // Optional: click to pause
      />
    </div>
  );
};

export default VideoPlayerElement;
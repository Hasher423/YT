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

  const hlsUrl = videoData?.video?.video_Url?.playback_url; // ← This is your .m3u8
  const fallbackMp4 = videoData?.video?.video_Url?.secure_url;

  useEffect(() => {
    if (!videoRef.current || !hlsUrl) return;

    const video = videoRef.current;
    let hls;

    dispatch(setLoading(true));

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl
      video.play().catch(() => console.log("Autoplay prevented"));
    }
    // Inside your VideoPlayerElement.jsx → in the Hls() config
    else if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,              // Auto-select optimal starting quality
        maxBufferLength: 30,         // Keep 30 seconds ahead
        maxMaxBufferLength: 60,      // Maximum 1 minute buffer
        maxBufferSize: 60 * 1000 * 1000,  // 60MB buffer (stable HD)
        lowLatencyMode: false,       // Disable low-latency for VOD
        backBufferLength: 60,        // Keep 30 seconds behind
        enableWorker: true,
        progressive: false
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;

      // This is CRITICAL — start playing as soon as 1-2 chunks arrive
      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (video.paused && !videoData.isPlaying) {
          video.play().catch(() => { });
        }
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        dispatch(setDuration(video.duration));
        // Start playing IMMEDIATELY
        video.play().catch(() => console.log("Autoplay blocked"));
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
        preload="auto"
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

// --- FIXED CONTROLS.JSX ---
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const Controls = ({
    video,
    duration,
    currentTime,
    setCurrentTime,
    playing,
    setPlaying,
    mute,
    setMute,
}) => {
    const dispatch = useDispatch();
    const vloumeBar = useRef(null);
    const playback = useRef(null);
    const [showPlayBack, setshowPlayBack] = useState(true);
    const [volumeRange, setvolumeRange] = useState(100);

    const handleVolume = (e) => {
        const newVolume = Number((e.target.value / 100).toFixed(1));
        if (video.current) video.current.volume = newVolume;
    };

    const handleMute = () => {
        setMute((prevMute) => {
            if (video.current) video.current.volume = prevMute ? Number((vloumeBar.current.value / 100).toFixed(1)) : 0;
            return !prevMute;
        });
    };

    const handleProgress = (e) => {
        const newTime = e.target.value;
        if (video.current) {
            video.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const toggleFullScreen = () => {
        if (video.current) {
            if (!document.fullscreenElement) {
                video.current.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const handlePlayToggle = () => {
        if (!video.current) return;

        if (video.current.paused || video.current.ended) {
            video.current.play();
            dispatch(setPlaying(true))
        } else {
            video.current.pause();
            dispatch(setPlaying(false))
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.code === 'Space') {
                e.preventDefault();
                handlePlayToggle();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div>
            <div className="controls w-full sm:h-[90px] absolute bottom-0 sm:py-4 px-3 bg-transparent">
                <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleProgress}
                />
                <div className="controls flex w-full justify-between items-center">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <i className="ri-skip-back-fill text-[4vw] sm:text-[2vw] text-white"></i>
                        {playing ? (
                            <i onClick={handlePlayToggle} className="ri-pause-fill text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                        ) : (
                            <i onClick={handlePlayToggle} className="ri-play-fill text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                        )}
                        <i className="ri-skip-forward-fill text-[4vw] sm:text-[2vw] text-white"></i>

                        <div className="flex items-center gap-4">
                            {mute ? (
                                <i onClick={handleMute} className="ri-volume-mute-line text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                            ) : (
                                <i onClick={handleMute} className="ri-volume-up-fill text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                            )}
                            <input
                                ref={vloumeBar}
                                type="range"
                                min="0"
                                max="100"
                                defaultValue={volumeRange}
                                className="sm:w-[6vw] sm:block hidden"
                                onChange={handleVolume}
                            />
                        </div>

                        <div className="text-white text-[4vw] sm:text-[1.4vw]">
                            {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`} /{' '}
                            {duration
                                ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
                                : '00:00'}
                        </div>
                    </div>

                    <div className="flex gap-[4vh] sm:gap-3">
                        <div className='flex flex-col'>
                            <div
                                ref={playback}
                                className={`${showPlayBack ? 'opacity-0' : ''} absolute bottom-[7vw] flex flex-col py-2 right-[2vw] bg-black text-white`}>
                                {[0.5, 1.0, 1.5, 2.0].map((rate) => (
                                    <button
                                        key={rate}
                                        className='py-2 border-b-[1px] border-opacity-5 px-8'
                                        onClick={() => {
                                            video.current.playbackRate = rate;
                                            setshowPlayBack(true);
                                        }}>
                                        {rate}
                                    </button>
                                ))}
                            </div>
                            <i
                                onClick={() => setshowPlayBack(!showPlayBack)}
                                className="ri-settings-3-fill text-[4vw] sm:text-[2vw] text-white"></i>
                        </div>

                        <i className="ri-fullscreen-line text-[4vw] sm:text-[2vw] text-white cursor-pointer" onClick={toggleFullScreen}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;

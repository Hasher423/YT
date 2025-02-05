import React, { useEffect, useState } from 'react'

const Controls = ({ video, duration, currentTime,play,mute }) => {
    const handleVolume = (e) => {
        const newVolume = Number((e.target.value / 100).toFixed(1));
        if (video.current) video.current.volume = newVolume;
    };

    const handleMute = () => {
        setMute((prevMute) => {
            if (video.current) video.current.volume = prevMute ? 1 : 0;
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
                video.current.requestFullscreen()
            } else {
                document.exitFullscreen();
            }
        }
    };


    const handlePlay = () => {
        if (video.current) {
            setPlay(!play);
            play ? video.current.pause() : video.current.play();
        }
    };

    
    return (
        <div>
            {/* Controls */}
            <div className="controls w-full h-[90px] absolute bottom-0 py-4 px-3 bg-transparent">
                <input
                    type="range"
                    className="w-full"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleProgress}
                />
                <div className="controls flex w-full justify-between items-center">
                    {/* Left Controls */}
                    <div className="flex items-center gap-5">
                        <i className="ri-skip-back-fill text-[2vw] text-white"></i>
                        {play ? (
                            <i onClick={handlePlay} className="ri-pause-fill text-[2vw] text-white cursor-pointer"></i>
                        ) : (
                            <i onClick={handlePlay} className="ri-play-fill text-[2vw] text-white cursor-pointer"></i>
                        )}
                        <i className="ri-skip-forward-fill text-[2vw] text-white"></i>

                        {/* Volume Controls */}
                        <div className="flex items-center gap-4">
                            {mute ? (
                                <i onClick={handleMute} className="ri-volume-mute-line text-[2vw] text-white cursor-pointer"></i>
                            ) : (
                                <i onClick={handleMute} className="ri-volume-up-fill text-[2vw] text-white cursor-pointer"></i>
                            )}
                            <input type="range" className="w-[6vw]" onChange={handleVolume} />
                        </div>

                        {/* Time Display */}
                        <div className="text-white">
                            {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)
                                .toString()
                                .padStart(2, '0')}`} /{' '}
                            {duration
                                ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60)
                                    .toString()
                                    .padStart(2, '0')}`
                                : '00:00'}
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex gap-3">
                        <i className="ri-settings-3-fill text-[2vw] text-white"></i>
                        <i className="ri-fullscreen-line text-[2vw] text-white cursor-pointer" onClick={toggleFullScreen}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Controls
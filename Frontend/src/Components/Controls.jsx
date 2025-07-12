import React, { useEffect, useRef, useState } from 'react'

const Controls = ({ video, duration, currentTime, setCurrentTime, play, setPlay, mute, setMute, playing }) => {

    const vloumeBar = useRef(null)
    const playback = useRef(null)
    const [showPlayBack, setshowPlayBack] = useState(true)

    const [volumeRange, setvolumeRange] = useState(100)

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
                video.current.requestFullscreen()
            } else {
                document.exitFullscreen();
            }
        }
    };


    const handlePlay = () => {
        if (video.current) {
            setPlay(!play);
            console.log(play);

            play ? video.current.pause() : video.current.play();
        }
    };



    useEffect(() => {


        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.code === 'Space') {
                e.preventDefault();
                handlePlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [play]);

    return (
        <div>
            {/* Controls */}
            <div className="controls w-full sm:h-[90px] absolute bottom-0 sm:py-4 px-3 bg-transparent">
                <input
                    type="range"
                    className="w-full "
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleProgress}
                />
                <div className="controls flex w-full justify-between items-center">
                    {/* Left Controls */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <i className="ri-skip-back-fill text-[4vw] sm:text-[2vw] text-white"></i>
                        {playing ? (
                            <i onClick={handlePlay} className="ri-pause-fill text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                        ) : (
                            <i onClick={handlePlay} className="ri-play-fill text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                        )}
                        <i className="ri-skip-forward-fill text-[4vw] sm:text-[2vw] text-white"></i>

                        {/* Volume Controls */}
                        <div className="flex items-center gap-4">
                            {mute ? (
                                <i onClick={handleMute} className="ri-volume-mute-line text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                            ) : (
                                <i onClick={handleMute}
                                    className="ri-volume-up-fill text-[4vw] sm:text-[2vw] text-white cursor-pointer"></i>
                            )}
                            <input ref={vloumeBar} type="range" min="0" max="100" defaultValue={volumeRange} className="sm:w-[6vw] sm:block hidden " onChange={handleVolume} />
                        </div>

                        {/* Time Display */}
                        <div className="text-white text-[4vw] sm:text-[1.4vw] ">
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
                    <div className="flex gap-[4vh] sm:gap-3">
                        <div className='flex flex-col '>
                            <div
                                ref={playback}
                                className={`${showPlayBack ? 'opacity-0' : ''} absolute bottom-[7vw] flex flex-col py-2   right-[2vw] bg-black bg-opacity- text-white `}>
                                <button
                                    className='py-2 border-b-[1px] border-opacity-5 px-8  '
                                    onClick={(e) => {
                                        video.current.playbackRate = Number(e.target.innerHTML)
                                        setshowPlayBack(!showPlayBack)

                                        // handleSpeed(e.target.value)
                                    }}> 0.5  </button>
                                <button
                                    className='py-2 border-b-[1px] border-opacity-5 px-8  '
                                    onClick={(e) => {
                                        video.current.playbackRate = Number(e.target.innerHTML)
                                        setshowPlayBack(!showPlayBack)

                                        // handleSpeed(e.target.value)
                                    }}> 1.0 </button>
                                <button
                                    className='py-2 border-b-[1px] border-opacity-5 px-8  '
                                    onClick={(e) => {
                                        video.current.playbackRate = Number(e.target.innerHTML)
                                        setshowPlayBack(!showPlayBack)

                                        // handleSpeed(e.target.value)
                                    }}> 1.5 </button>
                                <button
                                    className='py-2 border-b-[1px] border-opacity-5 px-8  '
                                    onClick={(e) => {
                                        video.current.playbackRate = Number(e.target.innerHTML)
                                        setshowPlayBack(!showPlayBack)
                                        // handleSpeed(e.target.value)
                                    }}> 2.0 </button>
                            </div>
                            <i
                                onClick={() => {
                                    setshowPlayBack(!showPlayBack)
                                }}
                                className="ri-settings-3-fill text-[4vw] sm:text-[2vw] text-white"></i>
                        </div>

                        <i className="ri-fullscreen-line text-[4vw] sm:text-[2vw] text-white cursor-pointer" onClick={toggleFullScreen}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Controls
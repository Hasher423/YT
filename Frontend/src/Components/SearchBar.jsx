import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context/VideosContext'

const SearchBar = () => {
    const isVoiceSupported = 'webkitSpeechRecognition' in window;
    const setshowSideBar = useContext(Context)[1]
    const SideBar = useContext(Context)[0]
    const searchBar = useRef(null)
    const [searchInput, setSearchInput] = useState('');
    const [showPanel, setshowPanel] = useState(false)
    const [showChannel, setshowChannel] = useState(false)
    const [ShowSearchPannel, setShowSearchPannel] = useState(false)
    const [sticky, setsticky] = useState(false)
    const [theme, settheme] = useState('dark')
    const [user, setuser] = useState('')


    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            let silenceTimer;

            recognition.onstart = () => {
                console.log('🎤 Voice recognition started');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSearchInput(transcript);

                // Stop after 2 seconds of silence
                if (silenceTimer) clearTimeout(silenceTimer);
                silenceTimer = setTimeout(() => {
                    recognition.stop();
                }, 2000);
            };

            window.startVoiceRecognition = () => {
                recognition.start();
            };
        }
    }, []);






    const handleShowPanel = () => {
        setshowPanel(!showPanel)
    }

    useEffect(() => {
        let lastScrollTop = window.scrollY; // Initial scroll position

        const handleScroll = () => {
            let currentScroll = window.scrollY;

            if (currentScroll < lastScrollTop) {
                setsticky(true); // Scrolling up → Stick the element
            } else {
                setsticky(false); // Scrolling down → Unstick the element
            }

            lastScrollTop = currentScroll; // Update last scroll position
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
        };
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getuser`, {
                withCredentials: true,
            });
            setuser(response.data);
        };
        fetchData();
    }, []);


    const logOut = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/logout`,
                {
                    withCredentials: true,
                }
            );
            if (response?.data?.message) {
                window.location.href = '/'
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div
            style={{
                transition: 'all 5s ease-in-out',
            }}
            ref={searchBar} className={`w-full fixed lt-sm:py-[2vw]  z-[99] px-[3vw] sm:px-[3.3vw] py-[.6vw] text-[1.3vw] flex items-center gap-10 justify-between bg-custom-black`}>
            {/* HAMBURGER AND LOGO */}
            <div className=' flex items-center gap-[2vw] sm:gap-[1.8vw]'>
                <i
                    onClick={() => {
                        setshowSideBar((prev) => {
                            console.log(SideBar);
                            return !prev;
                        });

                    }}
                    className="ri-menu-line text-custom-white font-[100]  text-[4vw]  sm:text-[2vw]"></i>
                <div className='flex items-center gap-[.2vw]'>
                    <img
                        className='w-[6vw] h-[6vw]  sm:w-[2.3vw] sm:h-[2.3vw] '
                        src="/assets/images/ytlogo.png" alt="" />
                    <Link to={'/'} className='font-youtube font-[500] ml-[1.4vw] sm:ml-0 text-[3.3vw] sm:text-[1.6vw] text-custom-white tracking-[-.1vw] after:content-["PK"] after:text-gray-400 after:absolute sm:after:top-3 after:top-[3vw] after:text-[3vw] sm:after:text-[.8vw] after:font-light '>YouTube</Link>
                </div>
            </div>




            {/* SEARCHBAR AND MIC  */}
            <div className='bg-green-90 hidden  sm:flex items-center gap-3 '>
                <div className='border-[1px] flex w-[38vw] border-zinc-400 bg-zinc-700 rounded-3xl  '>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder='Search '
                        className='w-[90%] text-[1.1vw] font- py-[.4vw] font-light bg-[#0F0F0F] px-3 text-white outline-blue-900 ml-[.2vw] rounded-l-3xl'
                    />

                    {isVoiceSupported && <i
                        className="ri-search-line cursor-pointer  font-light text-custom-white ml-[1vw] mt-[.2vw]"></i>}
                </div>

                <div className='bg-zinc-700 rounded-full px-3 cursor-pointer '>
                    <i
                        onClick={() => {
                            if (isVoiceSupported) window.startVoiceRecognition?.();
                            else alert('Voice recognition not supported in this browser.');
                        }}
                        className="ri-mic-fill rounded-full text-[2vw] text-white "></i>
                </div>

            </div>






            {/* CREATE CHANNEL NOTIFICATION */}

            <div className='flex items-center justify-between sm:gap-4 gap-[3vw] cursor-pointer'>
                <div className='relative flex items-center bg-custon-white px-3 py-1 font-light sm:rounded-xl rounded-[3vw] text-[1.2vw] text-custom-white'>
                    {showPanel ? <div className='lt-sm:text-[1.4vh] lt-sm:-bottom-[18vw] absolute font-semibold tracking-tighter -bottom-[7.8vw] right-[-2vw] bg-black whitespace-nowrap '>
                        <div className='px-2 py-1 gap-[.8vw] flex items-center text-white hover:bg-zinc-800'>
                            <div><i className="ri-video-add-line"></i></div>
                            <Link to={'/UploadVideo'}>Upload video</Link>
                        </div>
                        <div className='px-2 py-1 gap-[.8vw] flex items-center text-white hover:bg-zinc-800'>
                            <div><i className="ri-broadcast-line"></i></div>
                            <div>Go live</div>
                        </div>
                        <div className='px-2 py-1 gap-[.8vw] flex items-center text-white hover:bg-zinc-800'>
                            <div><i className="ri-file-text-line"></i></div>
                            <div>Create post</div>
                        </div>
                    </div> : ''}
                    <div className='text-[3vw] sm:text-[1.3vw] text-custom-white' onClick={handleShowPanel}>
                        <i className="ri-add-line"></i>
                        Create
                    </div>
                </div>
                <div className='text-[5vw] sm:text-[1.7vw]'><i className="ri-notification-4-line text-white"></i></div>

                <div
                    onClick={() => {
                        setshowChannel(!showChannel)
                    }}
                    className='bg-red-900 w-[7vw] h-[7vw] sm:w-8 sm:h-8 rounded-full overflow-hidden'>
                    {showChannel ? <div className='lt-sm:right-[5vh] lt-sm:text-[2vh] lt-sm:-bottom-[8vh] absolute rounded right-0 -bottom-[4vw] px-[2vw] bg-black text-white whitespace-nowrap'>
                        <div className='py-1'>
                            <Link to={`/channel/@${user?.user?.channelName}`}>Channel</Link>
                        </div>
                        <div
                            onClick={() => {
                                logOut();
                            }}
                            className='pb-2'>
                            Logout
                        </div>
                    </div> : ''}
                    <img
                        className='w-full h-full object-cover'
                        src={`${user?.user?.logoId}`}
                        alt="IMAGEERROR"
                    />


                </div>
                {/* SEarch Icon */}
                <div
                    onClick={() => {
                        setShowSearchPannel((prev) => !prev)
                    }}
                    className='bg-zinc-700 sm:hidden flex items-center justify-center w-[7vw] h-[7vw] text-[3.5vw] rounded-full'>
                    <i className="ri-search-line cursor-pointer  font-light text-custom-white"></i>
                </div>
                <div className={`hidden w-[100vw] h-screen bg-custom-black absolute top-0 left-0 ${ShowSearchPannel ? 'lt-sm:grid' : 'lt-sm:hidden'} grid-rows-[1fr_9fr]`}>
                    <div className='w-full   grid grid-cols-[20%_60%_20%]'>
                        <div
                            onClick={() => {
                                setShowSearchPannel((prev) => !prev)
                            }}
                            className=' flex items-center justify-center'>
                            <i className="ri-arrow-left-long-line text-white text-[5vh]"></i>
                        </div>
                        <div className=' flex items-center justify-center '>
                            <div className='border-[1px] flex w-[%] border-zinc-400 bg-zinc-700 rounded-3xl  '>
                                <input
                                    placeholder='Search '
                                    className='w-[90%] text-[4vw]  font-light bg-[#0F0F0F] px-3 text-white outline-blue-900 ml-[.2vw] rounded-l-3xl'
                                    type="text" />

                                <i className="ri-search-line cursor-pointer px-1  font-light text-custom-white ml-[vw] mt-[.6vw] text-[4vw]"></i>
                            </div>
                        </div>
                        <div className=' flex items-center justify-center'>
                            <div className='bg-zinc-700 p-[2vw] rounded-full flex items-center justify-center cursor-pointer '>
                                <i className="ri-mic-fill rounded-full text-[4vw] text-white "></i>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {['Search query 1 ', 'Search query 2', 'Search query 3 ', 'Search Query 4']
                            .map((query) => {
                                return <div>
                                    <div className='border-b-[1px] border-zinc-700 px-[3vw]'>
                                        <p className='text-blue-600 text-[5vw]'>{query}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SearchBar
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = ({ setshowSideBar }) => {
    const searchBar = useRef(null)
    const [showPanel, setshowPanel] = useState(false)
    const [sticky, setsticky] = useState(false)

    const handleShowPanel = () =>{
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



    return (
        <div
            style={{
                transition: 'all 5s ease-in-out',
            }}
            ref={searchBar} className={`w-full fixed  z-[99] px-10 py-3 text-[1.3vw] flex items-center justify-between bg-custom-black`}>
            {/* HAMBURGER AND LOGO */}
            <div className=' flex items-center gap-[.8vw]'>
                <i
                    onClick={() => {
                        setshowSideBar(prev => !prev)
                    }}
                    class="ri-menu-line text-white font-light text-[2vw]"></i>
                <div className='flex items-center gap-[.2vw]'>
                    <img
                        className='w-8 h-8 '
                        src="/assets/images/ytlogo.png" alt="" />
                    <Link to={'/'} className='font-youtube text-[1.6vw] text-custom-white tracking-tighter after:content-["PK"] after:text-gray-400 after:absolute after:top-3 after:text-[.8vw] after:font-light '>YouTube</Link>
                </div>
            </div>




            {/* SEARCHBAR AND MIC  */}
            <div className='bg-green-90 flex items-center gap-3 '>
                <div className='border-[1px] w-[40vw] border-zinc-400 bg-zinc-700 rounded-3xl  '>
                    <input
                        placeholder='Search '
                        className='w-[90%] text-[1.6vw] font- py-[.2vw] font-light bg-[#0F0F0F] px-3 text-white outline-blue-900 ml- rounded-l-3xl'
                        type="text" />

                    <i className="ri-search-line cursor-pointer  font-light text-custom-white ml-3"></i>
                </div>

                <div className='bg-zinc-700 rounded-full px-3 cursor-pointer'>
                    <i className="ri-mic-fill rounded-full text-[2vw] text-white  vw] "></i>
                </div>

            </div>







            {/* CREATE CHANNEL NOTIFICATION */}
            <div className='flex items-center justify-between gap-4 cursor-pointer'>
                <div className='relative flex items-center bg-zinc-800 px-3 py-1 font-light rounded-xl text-[1.2vw] text-custom-white'>
                    { showPanel  ? <div  className='absolute font-semibold tracking-tighter -bottom-[7.8vw] right-[-2vw] bg-black whitespace-nowrap'>
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
                    <div className='text-[1.3vw]' onClick={handleShowPanel}>
                        <i className="ri-add-line"></i>
                        Create
                    </div>
                </div>
                <div className='text-[1.7vw]'><i className="ri-notification-4-line text-white"></i></div>
                <div className='bg-red-900 w-9 h-9 rounded-full'>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    )
}

export default SearchBar
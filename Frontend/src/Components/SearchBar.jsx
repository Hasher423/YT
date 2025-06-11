import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = ({ setshowSideBar }) => {
    const searchBar = useRef(null)
    const [showPanel, setshowPanel] = useState(false)
    const [showChannel, setshowChannel] = useState(false)
    const [sticky, setsticky] = useState(false)
    const [theme, settheme] = useState('dark')
    const [user, setuser] = useState('')

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
            const response = await axios.get('http://localhost:3000/user/getuser', {
                withCredentials: true,
            });
            setuser(response.data);
            console.log(response)
        };
        fetchData();
    }, []);


    const logOut = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/user/logout'
                ,{
                    withCredentials: true,
                }
            );
            if(response?.data?.message){
                window.location.href = '/'
            }
        }catch(err) {
            console.log(err)
        }
    }


    return (
        <div
            style={{
                transition: 'all 5s ease-in-out',
            }}
            ref={searchBar} className={`w-full fixed  z-[99] px-[3vw] sm:px-10 py-3 text-[1.3vw] flex items-center gap-10 justify-between bg-custom-black`}>
            {/* HAMBURGER AND LOGO */}
            <div className=' flex items-center gap-[2vw] sm:gap-[.8vw]'>
                <i
                    onClick={() => {
                        setshowSideBar(prev => !prev)
                    }}
                    className="ri-menu-line text-custom-white font-light text-[5vw] sm:text-[2vw]"></i>
                <div className='flex items-center gap-[.2vw]'>
                    <img
                        className='w-[8vw] h-[8vw] sm:w-8 sm:h-8 '
                        src="/assets/images/ytlogo.png" alt="" />
                    <Link to={'/'} className='font-youtube ml-[1.4vw] sm:ml-0 text-[3.3vw] sm:text-[1.6vw] text-custom-white tracking-tighter after:content-["PK"] after:text-gray-400 after:absolute sm:after:top-3 after:top-[3vw] after:text-[3vw] sm:after:text-[.8vw] after:font-light '>YouTube</Link>
                </div>
            </div>




            {/* SEARCHBAR AND MIC  */}
            <div className='bg-green-90 hidden  sm:flex items-center gap-3 '>
                <div className='border-[1px] flex w-[40vw] border-zinc-400 bg-zinc-700 rounded-3xl  '>
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

            <div className='flex items-center justify-between sm:gap-4 gap-[3vw] cursor-pointer'>
                <div className='relative flex items-center bg-custon-white px-3 py-1 font-light sm:rounded-xl rounded-[3vw] text-[1.2vw] text-custom-white'>
                    {showPanel ? <div className='absolute font-semibold tracking-tighter -bottom-[7.8vw] right-[-2vw] bg-black whitespace-nowrap '>
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
                onClick={() =>{
                    setshowChannel(!showChannel)
                }}
                className='bg-red-900 w-[7vw] h-[7vw] sm:w-9 sm:h-9 rounded-full overflow-hidden'>
                   {showChannel? <div className='absolute rounded right-0 -bottom-[4vw] px-[2vw] bg-black text-white whitespace-nowrap'>
                        <div className='py-1'>
                            Channel
                        </div>
                        <div 
                        onClick={() =>{
                            logOut();
                        }}
                        className='pb-2'>
                            Logout
                        </div>
                    </div>: ''}
                    <img
                        className='w-full h-full object-cover object-center'
                        src={`${user?.user?.logoId}`}
                        alt="IMAGEERROR"
                    />


                </div>

                <div className='bg-zinc-700 sm:hidden flex items-center justify-center w-[7vw] h-[7vw] text-[3.5vw] rounded-full'>
                    <i className="ri-search-line cursor-pointer  font-light text-custom-white"></i>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
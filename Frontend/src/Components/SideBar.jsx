import React, { useEffect, useState } from 'react'
import axios from 'axios'
const SideBar = ({ showSideBar }) => {
    const [textUnit, setTextUnit] = useState('vw');
    useEffect(() => {
        if (window.innerWidth < 768) {
            setTextUnit('vh')
        }
    }, [])

    

    return (
        showSideBar ? <div className=' h-[100vh]  overflow-y-auto EDIT_SCROLL-BAR-SIDEBAR'>
            <div className='border-b-[1px]'>
                <div className='px-6 py-4  flex items-center flex-col gap-5 '>
                    <div className='flex items-center w-full  gap-4'>
                        <i class="ri-home-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Home</h2>
                    </div>
                    <div className='flex items-center w-full  gap-4'>
                        <i class="ri-youtube-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Shorts</h2>
                    </div>
                    <div className='flex items-center w-full  gap-4'>
                        <i class="ri-home-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Subscriptions</h2>
                    </div>
                </div>
            </div>
            {/* YOU */}
            <div className='border-b-[1px]'>
                <div className='px-6 py-4  flex items-center flex-col gap-5 '>
                    {/* <p className='text-[1.3vw] text-custom-white'>You</p> */}
                    <div className='flex items-center w-full  gap-5'>
                        <i class="ri-chat-history-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>History</h2>
                    </div>
                    <div className='flex items-center w-full  gap-5'>
                        <i class="ri-youtube-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Playlists</h2>
                    </div>
                    <div className='flex items-center w-full  gap-5'>
                        <i class="ri-home-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>YourVideos</h2>
                    </div>
                    <div className='flex items-center w-full  gap-5'>
                        <i class="ri-home-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Watch Later</h2>
                    </div>
                    <div className='flex items-center w-full  gap-5'>
                        <i class="ri-thumb-up-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Liked videos</h2>
                    </div>
                </div>
            </div>
            {/* SUBSCRIPTIONS */}
            <div className='border-b-[1px]'>
                <div className='px-6 py-4  flex items-center flex-col gap-5 '>
                    {/* <p className='text-[1.5vw] text-white '>Subscriptions</p> */}
                    <div className='flex items-center w-full  gap-4'>
                        <i class="ri-home-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Home</h2>
                    </div>
                    <div className='flex items-center w-full  gap-4'>
                        <i class="ri-youtube-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Shorts</h2>
                    </div>
                    <div className='flex items-center w-full  gap-4'>
                        <i class="ri-home-line ri-1x text-custom-white"></i>
                        <h2 className={`text-custom-white text-[1.3${textUnit}] font-light`}>Subscriptions</h2>
                    </div>
                </div>
            </div>
        </div> : null
    )
}

export default SideBar
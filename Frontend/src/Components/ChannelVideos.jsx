import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const ChannelVideos = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    const [Videos, setVideos] = useState([])
    const [loading, setloading] = useState(true)


    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getUserVideos/${user._id}`);

            setVideos(response?.data);
            setloading(false)
        } catch (error) {
            console.error('Error fetching videos:', error.message, error.response?.data);
        }
    };


    useEffect(() => {
        fetchVideos()
    }, [])

    return (
        <div>
            {loading ? '' : <div className=''>
                {Videos.map((elem, idx) => {
                    console.log(idx);

                    return <Link to={`/video/videoPlayer?v`} className={`w-[90vw] ${idx === 0 && 'pt-9'}  pt-1 ml-auto grid sm:grid-cols-[3fr_5fr_1fr] pb-[2vw] items-stretch pt- px-5`}>
                        <div className=' p-[vw]'>
                            <img className=' rounded-xl  aspect-[16/9] object-cover  ' src={`${elem.thumbnail_Url.url}`} alt="" />
                        </div>
                        <div className='bg-gree  text-custom-white sm:text-[1.2vw] font-[500] px-4'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, similique.</p>

                            <div className='flex items-center font-[400] text-white text-opacity-50'>
                                <div>{elem.views} views</div>
                                <div className='mx-2'>•</div>
                                <div>____ago</div>
                            </div>


                            <div className=' hidden sm:flex items-center gap-2 sm:mt-[3vh] mt-[4vw]    '>
                                <div><img className='sm:w-[3.3vw] w-[7vw] sm:h-[3.3vw] rounded-full ' src="https://yt3.ggpht.com/FdLutJAen7zJHXredukK2h42fRgrBY0BM43fAqsNI8oriRv7-_w02VyYf5cqATBrgRQFJHO_=s68-c-k-c0x00ffffff-no-rj" alt="" /></div>
                                <div>@channelName </div>
                            </div>
                        </div>
                        <div className='sm:block hidden text-left font-bold'>
                            <i className="ri-more-2-line text-white"></i>
                        </div>
                    </Link>

                })}
            </div>}
        </div>
    )
}

export default ChannelVideos
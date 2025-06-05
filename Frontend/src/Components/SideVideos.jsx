import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Context } from '../Context//VideosContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';



const SideVideos = () => {
    const data1 = useContext(Context);
    console.log(data1);
    const [data, setdata] = useState()

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideos/`)
                setdata(response.data)
            } catch (error) {
                console.error('Error fetching videos:', error)
            }
        }

        fetchVideos()
    }, [])


    return (
        <div>
            {/* SIDE VIDEO CONTAINER */}


            {data?.videos?.length > 0 ? <div className='sm:bg-red-90 flex-1  p py-10'>

                {data.videos.map((element, index) => {
                    return (<Link to={`?v=${element._id}`}>
                        {/* SINGLE VIDEO */}
                        <div
                            key={index}
                            className={`sm:flex sm:leading-[2vw] gap-3  ${index === 0 ? 'pb-5' : 'pb-4'} `}>
                            {/* DIV OF THUMBNAIL  */}
                            <div className='relative' >
                                <div className='bg-zinc-900 bg-opacity-30 w-[2vw] h-[1vw] absolute bottom-[.9vw] rounded-sm right-[.8vmax]'></div>
                                <img
                                    className=' sm:w-[15vw] sm:max-h-[10vw]  border-[1px] border-zinc-900  sm:rounded-md bg-center object-contain'
                                    src={`${element.thumbnail_Url.url}`} alt="" />
                            </div>
                            {/* DETAILS OF VIDEO DIV */}
                            <div className='bg--900 w-[60%] text-white font-medium px-3 sm:px-0'>
                                <h1 className='overflow-hidden  text-wrap w-[15vmax] bg--900 '>

                                    {
                                        element.title.length > 30
                                            ? `${element.title.slice(0, 40)}...`
                                            :
                                            `${element.title} `
                                    }

                                </h1>
                                <h3><a href={`${element.video_Url.url}`}>@CAHNNEL NAME</a></h3>
                                <div className='flex items-center gap-3 text-zinc-400 opacity-70 font-thin'>
                                    <h3>VIEWS</h3>
                                    <h3>MONTHS AGO</h3>
                                </div>
                            </div>
                        </div>
                    </Link>)
                })}
            </div> : (
                <h1 className='w-[20vw] text-center text-white'>No videos available</h1>

            )}
        </div>

    )
}

export default SideVideos
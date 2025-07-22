import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Context } from '../Context//VideosContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';



const SideVideos = () => {
    const data1 = useContext(Context);
    const [data, setdata] = useState()

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideos/`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                    withCredentials: true,
                })
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


            {data?.videos?.length > 0 ? <div className='sm:bg-red-90 flex-1     '>

                {data.videos.map((element, index) => {
                    return (<Link to={`?v=${element._id}`}>
                        {/* SINGLE VIDEO */}
                        <div
                            key={index}
                            className={`sm:flex sm:leading-[2vw] gap-3 max  ${index === 0 ? 'pb-3' : 'pb-[.3vmax]'} `}>
                            {/* DIV OF THUMBNAIL  */}
                            <div className='relative' >
                                <img
                                    className=' sm:w-[20vw]   lt-sm:w-[100vw] aspect-[30/17]  border-[1px] border-zinc-900  sm:rounded-md  object-cover'
                                    src={`${element?.thumbnail_Url?.url}`} alt="" />
                            </div>
                            {/* DETAILS OF VIDEO DIV */}
                            <div className='w-[100%] text-white font-medium px-3 sm:px-0'>
                                <h1 className='overflow-hidden w-[15vw] lt-sm:w-[80%]  text-wrap '>

                                    {
                                        element.title.length > 30
                                            ? `${element.title.slice(0, 20)}...`
                                            :
                                            `${element.title} `
                                    }

                                </h1>
                                <h3><a href={`${element?.video_Url?.url}`}>@CAHNNEL NAME</a></h3>
                                <div className='flex items-center gap-3 text-zinc-400 opacity-70 font-thin'>
                                    <h3>{element?.views} views</h3>
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
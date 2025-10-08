import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Context } from '../Context//VideosContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../redux/features/videoSlice';
import { calculateAgo } from '../utils/Ago';
import Loader from './Loader';


const SideVideos = () => {
    const data1 = useContext(Context);
    const [data, setdata] = useState([])

    const dispatch = useDispatch();
    const videoData = useSelector((state) => state.video);

    useEffect(() => {
        const fetchVideosAsync = async () => {
            try {
                const data = await dispatch(fetchVideos()).unwrap();
                setdata(data.videos); 
            } catch (err) {
                console.error("Failed to fetch videos:", err);
            }
        };

        fetchVideosAsync();
    }, [dispatch]);


    return (
            <div>
                {/* SIDE VIDEO CONTAINER */}


                {data?.length > 0 ? <div className='sm:bg-red-90 flex-1  '>

                    {data.map((element, index) => {
                        // {console.log(element)}
                        return (<Link
                            key={index}
                            to={`?v=${element._id}`}>
                            {/* SINGLE VIDEO */}
                            <div
                                key={index}
                                className={`sm:flex sm:leading-[2vw] gap-3 max  ${index === 0 ? 'pb-3' : 'pb-[.3vmax]'} `}>
                                {/* DIV OF THUMBNAIL  */}
                                <div className='relative' >
                                    <img
                                        className=' sm:w-[20vw]   lt-sm:w-[100vw] aspect-[16/9]  border-[1px] border-zinc-900  sm:rounded-md  object-cover'
                                        src={`${element?.thumbnail_Url?.url}`} alt="" />
                                </div>
                                {/* DETAILS OF VIDEO DIV */}
                                <div className='w-[100%] text-white font-bebasNeue px-3 sm:px-0'>
                                    <h1 className='overflow-hidden w-[15vw] lt-sm:w-[80%]  text-wrap '>

                                        {
                                            element.title.length > 30
                                                ? `${element.title.slice(0, 20)}...`
                                                :
                                                `${element.title} `
                                        }

                                    </h1>
                                    <h3>@{element.channelName}</h3>
                                    <div className='flex items-center gap-3 text-zinc-400 opacity-70 font-bebasNeue'>
                                        <h3>{element?.views} views</h3>
                                        <h3>{calculateAgo(element.createdAt)}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>)
                    })}
                </div> : (
                    <h1 className='w-[20vw] text-center text-white'><Loader /></h1>

                )}
            </div>

        )
}

export default SideVideos
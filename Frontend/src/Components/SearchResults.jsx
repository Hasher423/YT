import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

const SearchResults = () => {
    const [searchedVideos, setsearchedVideos] = useState([])
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {

        const fetchVideos = async () => {
            console.log(query)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/search/searchVideo?q=${query}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                },
            })
            // setsearchedVideos(response.data)    
            setsearchedVideos(response.data)
            console.log(response.data)
        }

        fetchVideos();

    }, [query])

    return (
        <div className='min-h-screen bg-custom-black'>
            <SearchBar />


            <div className='pt-14 sm:pt-24 2xl:pt-40'>
                {searchedVideos.map((elem) => {
                    return <Link to={`/video/videoPlayer?v=${elem?._id}`} className='w-[90vw] border-b-[1px] border-zinc-700 pt-2 ml-auto grid sm:grid-cols-[3fr_5fr_1fr] pb-[2vw] items-stretch pt- px-5'>
                        <div className=' p-[vw]'>
                            <img className=' rounded-xl aspect-[16/9] object-cover  ' src={elem?.thumbnail_Url?.url} alt="" />
                        </div>
                        <div className='bg-gree  text-custom-white sm:text-[1.2vw] font-[500] px-2'>
                            <p>{elem.title}</p>

                            <div className='flex items-center font-[400] text-white text-opacity-50'>
                                <div>{elem.views} views</div>
                                <div className='mx-2'>•</div>
                                <div>____ago</div>
                            </div>


                            <div className=' hidden sm:flex items-center gap-2 sm:mt-[3vh] mt-[4vw]    '>
                                <div><img className='sm:w-[3.3vw] w-[7vw] sm:h-[3.3vw] rounded-full ' src="https://yt3.ggpht.com/FdLutJAen7zJHXredukK2h42fRgrBY0BM43fAqsNI8oriRv7-_w02VyYf5cqATBrgRQFJHO_=s68-c-k-c0x00ffffff-no-rj" alt="" /></div>
                                <div>{elem.channelName} </div>
                            </div>
                        </div>
                        <div className='sm:block hidden text-left font-bold'>
                            <i className="ri-more-2-line text-white"></i>
                        </div>
                    </Link>

                })}
            </div>
        </div>
    )
}

export default SearchResults
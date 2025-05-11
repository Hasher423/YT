import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import { Link } from 'react-router-dom';


const category = ['All', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty', 'Comedy', 'Education', 'Science', 'Travel', 'Gym', 'Food', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty',]


const MainVideos = () => {


    const [videos, setvideos] = useState(null)
    const [loading, setloading] = useState(true)
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
            const fetchVideos = async () => {
                try {
                    const response = await axios.get('http://192.168.0.12:3000/video/getVideos?page=1&limit=23');
                    setvideos(response.data.videos);
                    console.log(response.data.videos);

                    setloading(false);
                } catch (err) {
                    console.log(err.message);
                    // setloading(false);
                    setErrMessage(JSON.stringify(err))
                }
            };

            fetchVideos();
    }, []);


    return (
        <div className='w-[86vw] py-2'>
            {/* CATEGORY */}
            <div className=' inline-block mt-10'>
                <div className=' bg-red- py-[1vw]  h-[10vh] w-[100vw] overflow-x-auto mt-4 SCROLLBAR_OF_CATEGORY' >
                    {category.map((category, key) => {
                        return (
                            <div key={key} className='cursor-pointer bg-zinc-800 px-3 py-2 text-white rounded inline mx-2 font-medium'>{category}</div>
                        )
                    })}






                </div>

                <div className='text-white bg-green- w-[100vw] flex justify-center py-2   '>
                    {errMessage ? <div classaName=' '>{errMessage}</div> : <div className='sm:flex flex-wrap justify-center'>
                        {
                            loading ? <div className='LoaderOfMainVidoes'> </div> : videos.map((video, index) => {
                                return (<Link to={`/videoPlayer?v=${video._id}`} className='   bg-red- sm:m-4 '>
                                    <img
                                        className=' sm:w-[28vw] w-[100vw]  sm:max-h-[16vmax]  bg-cover rounded bg-center'
                                        src={video.thumbnail_Url.secureurl} alt="" />


                                    <div className='py-2 bg- h-[30vw] sm:h-[] px-3'>
                                        <h3 className='text-xl text-custom-white '>{video.title.length > 20 ? video.title.slice(0, 30) + '...' : video.title}</h3>
                                    </div>
                                </Link>)
                            })
                        }</div>}

                </div>
            </div>
        </div>
    )
}

export default MainVideos
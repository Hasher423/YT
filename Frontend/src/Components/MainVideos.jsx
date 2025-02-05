import React, { useEffect, useState } from 'react'
import axios from 'axios'

const category = ['All', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty', 'Comedy', 'Education', 'Science', 'Travel', 'Gym', 'Food', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty',]


const MainVideos = () => {


    const [videos, setvideos] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/video/getVideos?page=1&limit=13');
                setvideos(response.data.videos);
                console.log(response.data.videos);
                
                setloading(false);
            } catch (err) {
                console.log(err.message);
                // setLoading(false);
            }
        };

        fetchVideos();
    }, []);


    return (
        <div className='w-[86vw] py-2'>
            {/* CATEGORY */}
            <div className='px-6'>
                <div className=' bg-red- py-[1vw]  h-[10vh] overflow-x-auto mt-4 SCROLLBAR_OF_CATEGORY' >
                    {category.map((category, key) => {
                        return (
                            <div key={key} className='cursor-pointer bg-zinc-800 px-3 py-2 text-white rounded inline mx-2 font-medium'>{category}</div>
                        )
                    })}






                </div>


                <div className='bg-green- flex flex-wrap justify- '>
                    {loading ? 'loading ' : videos.map((video) => {
                        
                        return (<div className='h-[] w-[25vw]   bg-red- m-4'>
                            <img
                                className='w-full h-[%] bg-cover rounded bg-center'
                                src={video.thumbnail_Url.url} alt="" />


                            <div className='py-2'>
                                <h3 className='text-xl text-custom-white '>{video.title}</h3>
                                <h3 className='text-xl text-zinc-500'>{video.description}</h3>
                            </div>
                        </div>)
                    })}

                </div>
            </div>
        </div>
    )
}

export default MainVideos
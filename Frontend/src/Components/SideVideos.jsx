import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SideVideos = () => {
    const [data, setdata] = useState()

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/video/getVideos/')
                setdata(response.data)
                console.log(response)
            } catch (error) {
                console.error('Error fetching videos:', error)
            }
        }

        fetchVideos()
    }, [])


    return (
        <div>
            {/* SIDE VIDEO CONTAINER */}
            {console.log(data?.videos?.length > 0)}
            {data?.videos?.length > 0 ? <div className='bg--900 flex-1  p py-10'>

                {data.videos.map((element, index) => {
                    return (<div>
                        {/* SINGLE VIDEO */}
                        <div
                            key={index}
                            className={`flex leading-[1.5vw] gap-2 border-b ${index === 0 ? 'pb-5' : 'py-5'}  border-b-zinc-500`}>
                            {/* DIV OF THUMBNAIL  */}
                            <div className='' >
                                <img
                                    className='w-[15vw] max-h-[10vw] bg--900 border-[1px] border-zinc-900  rounded-xl bg-center object-contain'
                                    src={`${element.thumbnail_Url.url}`} alt="" />
                            </div>
                            {/* DETAILS OF VIDEO DIV */}
                            <div className='bg--900 w-[60%] text-white font-medium'>
                                <h1 className='overflow-hidden text-nowrap  '>
                                    {
                                        `${element.title}`.slice(0, 20) + '...'
                                    }

                                </h1>
                                <h3><a href={`${element.video_Url.url}`}>@CAHNNEL NAME</a></h3>
                                <div className='flex items-center gap-3 text-zinc-400 opacity-70 font-thin'>
                                    <h3>VIEWS</h3>
                                    <h3>MONTHS AGO</h3>
                                </div>
                            </div>
                        </div>
                    </div>)
                })}
            </div> : (
                <h1 className='w-[20vw] text-center text-white'>No videos available</h1>

            )}
        </div>
    )
}

export default SideVideos
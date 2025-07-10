import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios'
import { Link } from 'react-router-dom';




const ChannelVideos = () => {

    const user = JSON.parse(localStorage.getItem('user'))


    const [forYouVideos, setforYouVideos] = useState([])
    const [loading, setloading] = useState(true)


    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getUserVideos/${user._id}`);

            setforYouVideos(response?.data);
            setloading(false)
        } catch (error) {
            console.error('Error fetching videos:', error.message, error.response?.data);
        }
    };



    useEffect(() => {
        fetchVideos()
    }, [])


    const data = JSON.parse(localStorage.getItem('user'));
    const prevRef1 = useRef(null);
    const nextRef1 = useRef(null);
    const prevRef2 = useRef(null);
    const nextRef2 = useRef(null);


    return (
        <div>
            {loading ? '' : <div>


                {/* For You Slider */}
                <div className='py-[3vw] border-b-[1px] border-zinc-700 md:py-[.6vw] text-white text-[5vw] md:text-[1.8vw] font-[600]'>
                    <h2 className='py-[2vw]'>For You</h2>
                    <div className="relative px-[6vw]">
                        <div ref={prevRef1} className="absolute top-[50%] -translate-y-1/2 left-0 z-50 text-white text-[6vw] md:text-[2vw] cursor-pointer">
                            <i className="ri-arrow-left-s-line bg-zinc-800 rounded-full p-[1vw]" />
                        </div>
                        <div ref={nextRef1} className="absolute top-[50%] -translate-y-1/2 right-0 z-50 text-white text-[6vw] md:text-[2vw] cursor-pointer">
                            <i className="ri-arrow-right-s-line bg-zinc-800 rounded-full p-[1vw]" />
                        </div>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={forYouVideos?.length}
                            slidesPerView={2}
                            navigation={{
                                prevEl: prevRef1.current,
                                nextEl: nextRef1.current,
                            }}
                            onBeforeInit={(swiper) => {
                                if (typeof swiper.params.navigation !== 'boolean') {
                                    swiper.params.navigation.prevEl = prevRef1.current;
                                    swiper.params.navigation.nextEl = nextRef1.current;
                                }
                            }}
                        >
                            {forYouVideos.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <Link to={`/video/videoPlayer?v=${item._id}`} className='max-w-[25vw]'>
                                        <div className='w-[35vw] bg-red-900 h-[20vw] md:w-[35vw] md:h md:rounded-md overflow-hidden'>
                                            <img
                                                className='w-full h-full object-cover object-center'
                                                src={`${item.thumbnail_Url.url}`}
                                                alt=""
                                            />
                                        </div>
                                        <div className='w-[35vw] md:w-full grid grid-cols-[95%_5%] px-[1vw]'>
                                            <div className='md:text-[1.5vw] text-[2.3vw] font-[400]'>
                                                <p>
                                                    {
                                                        item.title.length > 15
                                                            ? item.title.split(' ').slice(0, 10).join(' ') + '...'
                                                            : item.title
                                                    }
                                                </p>
                                                <div className='flex font-[100] items-center text-custom-white text-opacity-35'>
                                                    <p>{item.views} Views</p>
                                                    <span className='font-[100] px-[.7vw]'>.</span>
                                                    <p>____ ago</p>
                                                </div>
                                            </div>
                                            <div><i className='ri-more-2-fill'></i></div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>




                {/* Videos Slider */}
                <div className='py-[2vw] md:py-[.4vw] text-white text-[4vw] md:text-[1.4vw] font-[600]'>
                    <h2 className='py-[1vw]'>Videos</h2>
                    <div className="relative px-[4vw]">
                        <div ref={prevRef2} className="absolute top-[50%] -translate-y-1/2 left-0 z-50 text-white text-[5vw] md:text-[1.5vw] cursor-pointer">
                            <i className="ri-arrow-left-s-line bg-zinc-800 rounded-full p-[0.8vw]" />
                        </div>
                        <div ref={nextRef2} className="absolute top-[50%] -translate-y-1/2 right-0 z-50 text-white text-[5vw] md:text-[1.5vw] cursor-pointer">
                            <i className="ri-arrow-right-s-line bg-zinc-800 rounded-full p-[0.8vw]" />
                        </div>

                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={2}
                            navigation={{
                                prevEl: prevRef2.current,
                                nextEl: nextRef2.current,
                            }}
                            onBeforeInit={(swiper) => {
                                if (typeof swiper.params.navigation !== 'boolean') {
                                    swiper.params.navigation.prevEl = prevRef2.current;
                                    swiper.params.navigation.nextEl = nextRef2.current;
                                }
                            }}
                        >
                            {forYouVideos.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <Link to={`/video/videoPlayer?v=${item._id}`} className='max-w-[25vw]'>
                                        <div className='w-[35vw] bg-red-900 h-[20vw] md:w-[35vw] md:h md:rounded-md overflow-hidden'>
                                            <img
                                                className='w-full h-full object-cover object-center'
                                                src={`${item.thumbnail_Url.url}`}
                                                alt=""
                                            />
                                        </div>
                                        <div className='w-[35vw] md:w-full grid grid-cols-[95%_5%] px-[1vw]'>
                                            <div className='md:text-[1.5vw] text-[2.3vw] font-[400]'>
                                                <p>
                                                    {
                                                        item.title.length > 15
                                                            ? item.title.split(' ').slice(0, 10).join(' ') + '...'
                                                            : item.title
                                                    }
                                                </p>
                                                <div className='flex font-[100] items-center text-custom-white text-opacity-35'>
                                                    <p>{item.views} Views</p>
                                                    <span className='font-[100] px-[.7vw]'>.</span>
                                                    <p>____ ago</p>
                                                </div>
                                            </div>
                                            <div><i className='ri-more-2-fill'></i></div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ChannelVideos;

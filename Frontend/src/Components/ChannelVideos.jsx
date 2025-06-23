import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ChannelVideos = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div>
            {/* Navigation Tabs */}
            <div className='text-custom-white md:py-[1vw] xl:text-[1.5vw] py-[4vw] text-opacity-30 border-b-[1px] border-zinc-700'>
                <div>
                    <span className='px-[3vw] md:px-[1.2vw] font-[500] inline-block border-b-2 border-white text-custom-white'>Home</span>
                    <span className='px-[3vw] md:px-[1.2vw] font-[500] inline-block'>Vidoes</span>
                    <span className='px-[3vw] md:px-[1.2vw] font-[500] inline-block'>Shorts</span>
                    <span className='px-[3vw] md:px-[1.2vw] font-[500] inline-block'>Playlists</span>
                    <span><i className='ri-search-line text-[5vw] md:text-[1.2vw] xl:text-[2vw]' /></span>
                </div>
            </div>

            {/* For You Section */}
            <div className='py-[3vw] md:py-[.6vw] text-white text-[5vw] md:text-[1.8vw] font-[600]'>
                <h2 className='py-[2vw]'>For You</h2>

                <div className="relative px-[6vw]">
                    {/* Custom Navigation Buttons */}
                    <div ref={prevRef} className="absolute top-[50%] -translate-y-1/2 left-0 z-50 text-white text-[6vw] md:text-[2vw] cursor-pointer">
                        <i className="ri-arrow-left-s-line bg-zinc-800 rounded-full p-[1vw]" />
                    </div>
                    <div ref={nextRef} className="absolute top-[50%] -translate-y-1/2 right-0 z-50 text-white text-[6vw] md:text-[2vw] cursor-pointer">
                        <i className="ri-arrow-right-s-line bg-zinc-800 rounded-full p-[1vw]" />
                    </div>

                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={2}
                        spaceBetween={20}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                            <SwiperSlide key={item}>
                                <div className='max-w-[25vw '>
                                    <div className='w-[35vw] bg-red-900 h-[20vw] md:w-auto md:h md:rounded-md overflow-hidden'>
                                        <img
                                            className='w-full h-full object-cover object-center'
                                            src="https://i.ytimg.com/vi/Rl93i7I67NY/hqdefault.jpg"
                                            alt=""
                                        />
                                    </div>
                                        <div className='w-[35vw] md:w-full grid grid-cols-[95%_5%] px-[.]'>
                                            <div className='md:text-[1.5vw] text-[2.3vw] font-[400]'>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                                <div className='flex font-[100] items-center  text-custom-white text-opacity-35'>
                                                    <p>2.3k Views</p>
                                                    <span className='font-[100] px-[.7vw] '>.</span>
                                                    <p>----ago</p>
                                                </div>
                                            </div>
                                            <div><i className='ri-more-2-fill'></i></div>
                                        </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ChannelVideos;

import React from 'react'
import SearchBar from './SearchBar'

const SearchResults = () => {
    return (
        <div className='min-h-screen bg-custom-black'>
            <SearchBar />


            <div className='pt-14 sm:pt-24 2xl:pt-40'>
                {[1, 2, 3, 4, 5, 6].map((elem) => {
                    return <div className='w-[90vw] ml-auto grid sm:grid-cols-[3fr_5fr_1fr] pb-[2vw] items-stretch pt- px-5'>
                        <div className=' p-[vw]'>
                            <img className=' rounded-xl object-cover' src="https://i.ytimg.com/vi/o-9N4bme8wY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDLL_IaCi6JVGH48POfnjIOpcRweg" alt="" />
                        </div>
                        <div className='bg-gree  text-custom-white sm:text-[1.2vw] font-[500] px-2'>
                            <p>10k mileStone reached! | live QNA Session | Whats coming NExt ?</p>

                            <div className='flex items-center font-[400] text-white text-opacity-50'>
                                <div>3.5k views</div>
                                <div className='mx-2'>•</div>
                                <div>____ago</div>
                            </div>


                            <div className=' hidden sm:flex items-center gap-2 sm:mt-[3vh] mt-[4vw]    '>
                                <div><img className='sm:w-[3.3vw] w-[7vw] sm:h-[3.3vw] rounded-full ' src="https://yt3.ggpht.com/FdLutJAen7zJHXredukK2h42fRgrBY0BM43fAqsNI8oriRv7-_w02VyYf5cqATBrgRQFJHO_=s68-c-k-c0x00ffffff-no-rj" alt="" /></div>
                                <div>Sheriyans coding school </div>
                            </div>
                        </div>
                        <div className='sm:block hidden text-left font-bold'>
                            <i className="ri-more-2-line text-white"></i>
                        </div>
                    </div>

                })}
            </div>
        </div>
    )
}

export default SearchResults
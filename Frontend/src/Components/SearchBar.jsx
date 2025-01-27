import React from 'react'

const SearchBar = () => {
    return (
        <div className='px-8 py-3 text-[2vw] flex items-center justify-between'>
            {/* HAMBURGER AND LOGO */}
            <div className=' flex items-center gap-[.8vw]'>
                <i class="ri-menu-line text-white font-light text-[2vw]"></i>
                <div className='flex items-center gap-[.2vw]'>
                    <img
                        className='w-8 h-8 '
                        src="/assets/images/ytlogo.png" alt="" />
                    <h2 className='font-youtube text-[1.5vw] text-custom-white tracking-tighter after:content-["PK"] after:text-gray-400 after:absolute after:top-3 after:text-[.8vw] after:font-light '>YouTube</h2>
                </div>
            </div>




            {/* SEARCHBAR AND MIC  */}
            <div className='bg-green-90 flex items-center gap-3 '>
                <div className='border-[1px] w-[45vw] border-zinc-400 bg-zinc-700 rounded-3xl  '>
                    <input
                    placeholder='Search '
                    className='w-[90%] font-light  h-[] bg-zinc-800 px-3 text-white outline-blue-900 ml- rounded-l-3xl'
                    type="text" />

                    <i className="ri-search-line cursor-pointer  font-light text-custom-white ml-3"></i>
                </div>

                <div className='bg-zinc-700 rounded-full px-3 cursor-pointer'>
                    <i className="ri-mic-line rounded-full w-[5vw] h-[3vw] "></i>
                </div>

            </div>







            {/* CREATE CAHNNEL NOTIFICATION */}
            <div className='flex items-center justify-between gap-4 cursor-pointer'>
                <div className='flex items-center bg-zinc-800 px-3 py-1 font-light rounded-xl text-[1.2vw] text-custom-white '>
                    <i className="ri-add-line"></i>
                    Create
                </div>
                <div><i className="ri-notification-4-line text-white"></i></div>
                <div className='bg-red-900 w-9 h-9 rounded-full'>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    )
}

export default SearchBar
import React from 'react'


const category = ['All', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty', 'Comedy', 'Education', 'Science', 'Travel', 'Gym', 'Food', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty',]


const MainVideos = () => {
    return (
        <div className='w-[86vw] py-2'>
            {/* CATEGORY */}
            <div>
                <div className=' bg-red- py-5  h-[10vh] overflow-x-auto mt-4 SCROLLBAR_OF_CATEGORY' >
                    {category.map((category, key) => {
                        return (
                            <div key={key} className='cursor-pointer bg-zinc-800 px-3 py-2 text-white rounded inline mx-2 font-medium'>{category}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MainVideos
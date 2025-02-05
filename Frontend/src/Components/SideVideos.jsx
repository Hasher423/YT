import React from 'react'

const SideVideos = () => {
    return (
        <div>
            {/* SIDE VIDEO CONTAINER */}
            <div className='bg--900 w-[30vw] h-screen p py-10'>
                {/* SINGLE VIDEO */}
                <div className='flex items-center gap-2 border-b pb-5 border-b-zinc-500'>
                    {/* DIV OF THUMBNAIL  */}
                    <div className='' >
                        <img
                            className='h-[9vw] bg--900 w-[14vw] rounded-xl bg-center object-cover'
                            src="https://res.cloudinary.com/dmazphi1z/image/upload/v1738173488/cgzylhs0w823gbz9rm0m.png" alt="" />
                    </div>
                    {/* DETAILS OF VIDEO DIV */}
                    <div className='bg--900 w-[60%] text-white font-medium'>
                        <h1 className='overflow-hidden text-nowrap  '>
                            {
                                '5 Secrets of Gratitude  | Happiness Unlocked '
                            }

                        </h1>
                        <h3>@CAHNNEL NAME</h3>
                        <div className='flex items-center gap-3 text-zinc-400 opacity-70 font-thin'>
                            <h3>VIEWS</h3>
                            <h3>MONTHS AGO</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideVideos
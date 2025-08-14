import React from 'react'

const Loader = () => {
  return (
    <div>
            <div className="absolute top-0 left-0 bg-zinc-900 w-[60vw] h-full flex items-center justify-center z-10 bg-opacity-60 rounded-xl">
                <div className="w-12 h-12 border-[1.8px] border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
        
        </div>
    </div>
  )
}

export default Loader
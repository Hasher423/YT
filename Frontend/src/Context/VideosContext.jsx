import React, { createContext, } from "react"

export const Context = createContext();
const VideosContext = ({ children }) => {
    const videos = ['hey', 'I', 'am', "HASHER"];
    return (
        <div>
            <Context.Provider value={[videos]}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default VideosContext
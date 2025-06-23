import React, { createContext, useState, } from "react"

export const Context = createContext();
const VideosContext = ({ children }) => {
    const videos = ['hey', 'I', 'am', "HASHER"];
    const [showSideBar, setshowSideBar] = useState(false)
    return (
        <div>
            <Context.Provider value={[videos, showSideBar, setshowSideBar]}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default VideosContext
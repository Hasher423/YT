import React, { createContext, useState, } from "react"



export const Context = createContext();
const VideosContext = ({ children }) => {
    const [showSideBar, setshowSideBar] = useState(false)
    return (
        <div>
            <Context.Provider value={[showSideBar, setshowSideBar]}>
                {children}
            </Context.Provider>
        </div>
    )
}

export default VideosContext
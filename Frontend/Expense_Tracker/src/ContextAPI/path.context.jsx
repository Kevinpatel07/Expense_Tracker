import { createContext, useState } from "react";

export const path = createContext()

const PathProvider = ({children})=>{
    const [title , settitle] = useState('Welcome')
    return <path.Provider value={{title , settitle}}>
        {children}
    </path.Provider>
}

export default PathProvider
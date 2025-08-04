import { createContext, useState } from "react";

export const path = createContext()

const PathProvider = ({children})=>{
    const [title , settitle] = useState('Welcome')
    const [transactions , settransactions] = useState([])
    return <path.Provider value={{title , settitle , transactions , settransactions}}>
        {children}
    </path.Provider>
}

export default PathProvider
import { createContext, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [isLogin , setisLogin] = useState(false)

    return <AuthContext.Provider value={{isLogin , setisLogin}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider
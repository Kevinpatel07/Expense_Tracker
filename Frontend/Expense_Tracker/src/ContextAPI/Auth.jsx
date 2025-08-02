import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [isLogin , setisLogin] = useState(false)
    const [loading, setLoading] = useState(true);

    
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setisLogin(true);
    }
    setLoading(false)
  }, [])

    return <AuthContext.Provider value={{isLogin , setisLogin , loading}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider
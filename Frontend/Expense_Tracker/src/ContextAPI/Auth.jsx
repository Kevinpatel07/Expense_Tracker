import { createContext, useEffect, useState } from "react";
import api from '../utils/axiosInstance'


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLogin, setisLogin] = useState(false)
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const verifyAndRefreshtoken = async () => {
      const accesstoken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("refreshToken")

      if (!refreshtoken) {
        setisLogin(false);
        setLoading(false);
        return;
      }

      if (accesstoken) {
        setisLogin(true); // assume token is okay for now
        setLoading(false);
        return;
      }

      try {

        const res = await api.post('/users/refresh-token', {
          refreshtoken: refreshtoken
        })

        const newAccesstoken = res.data.newAccessToken
        localStorage.set('accessToken', newAccesstoken)
        setisLogin(true)
      } catch (error) {

        console.error("Auto-refresh failed", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setisLogin(false);
      } finally {
         setLoading(false)
      }
    }

    verifyAndRefreshtoken()
  }, [])

  return <AuthContext.Provider value={{ isLogin, setisLogin, loading }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider
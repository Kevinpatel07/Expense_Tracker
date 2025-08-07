import React, { useContext } from 'react'
import { AuthContext } from '../ContextAPI/Auth'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const {isLogin , loading} = useContext(AuthContext)

  if(loading){
    return <div>Loading.....</div>
  }

  if(isLogin===false){
    return <Navigate to='/LogIn'/>
  }

  return children
}

export default ProtectedRoutes

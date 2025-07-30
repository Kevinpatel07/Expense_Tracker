import React, { useContext } from 'react'
import { AuthContext } from '../ContextAPI/Auth'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const {isLogin} = useContext(AuthContext)

  if(!isLogin){
    return <Navigate to='/LogIn'/>
  }

  return children
}

export default ProtectedRoutes

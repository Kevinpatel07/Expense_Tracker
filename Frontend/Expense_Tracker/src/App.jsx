import { useState } from 'react'
import './App.css'
import SignUp from './Components/SignUp'
import LogIn from './Components/LogIn'
import Dashboard from './Components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Forget_password from './Components/Forget_password'
import Resetpassword from './Components/Reset_password'
import Main_Page from './Components/Main_Page'
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path='/SignUp' element={<SignUp />}></Route>
        <Route path='/LogIn' element={<LogIn />}></Route>
        <Route path='/Forget_password' element={<Forget_password />}></Route>
        <Route path='/Resetpassword/:token' element={<Resetpassword />}></Route>
        <Route path='/Main_Page' element={<ProtectedRoutes>  <Main_Page/>  </ProtectedRoutes>}></Route>
      </Routes>
    </>
  )
}

export default App

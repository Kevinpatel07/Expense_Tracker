import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './Components/SignUp'
import LogIn from './Components/LogIn'
import Dashboard from './Components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Forget_password from './Components/Forget_password'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/LogIn' element={<LogIn/>}></Route>
      <Route path='/Forget_password' element={<Forget_password/>}></Route>
    </Routes>
    
    </>
  )
}

export default App

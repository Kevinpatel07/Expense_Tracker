import React, { useRef } from 'react'
import { NavLink ,  useNavigate } from 'react-router-dom'
import api from '../utils/axiosInstance'

const LogIn = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLogin = async () => {
    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()

    try {
      const res = await api.post("/login", {
        email,
        password
      })

      console.log(res)
      localStorage.setItem("accessToken", res.data.Accesstoken)
      localStorage.setItem("refreshToken" , res.data.Refreshtoken)

      alert("Login successful!");
      navigate('/Main_Page');
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message);
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className='parentLogin'>
      <div className='login-box'>
        <div className='login'>
          <div className='login-header'>
            <h2>Login to Your Account</h2>
          </div>

          <div className='login-inputs'>
            <label htmlFor="email">Email:</label>
            <input ref={emailRef} type="email" id="email" placeholder='Enter your email' />

            <label htmlFor="password">Password:</label>
            <input ref={passwordRef} type="password" id="password" placeholder='Enter your password' />
          </div>

          <div className='forget-password'>
            <NavLink style={{color:"black"}} to='/Forget_password'>Forget Password?</NavLink>
          </div>

          <div className='login-button'>
            <button onClick={handleLogin}>LogIn</button>
          </div>
        </div>
        <div className='welcome-back'>
          <h2>Welcome Back</h2>
        </div>
      </div>
    </div>
  )
}

export default LogIn



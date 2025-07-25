import React, { useRef } from 'react'
import axios from 'axios'
import { NavLink ,  useNavigate } from 'react-router-dom'

const LogIn = () => {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLogin = async () => {
    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()

    try {
      const res = await axios.post("http://localhost:7390/Users/login", {
        email,
        password
      })

      localStorage.setItem("accessToken", res.data.Accesstoken)

      alert("Login successful!");
      navigate('/Dashboard');
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

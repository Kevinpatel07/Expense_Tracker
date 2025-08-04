import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';


const SignUp = () => {
  const navigate = useNavigate()
  const [userSignUp, setuserSignUp] = useState({ username: "", email: "", password: "" })

  const handleChange = (event) => {
    setuserSignUp({ ...userSignUp, [event.target.name]: event.target.value })
  }
 
  const handleSignUp = async()=>{
    try {
       await api.post('users/Signup' , {username:userSignUp.username , 
        email:userSignUp.email , 
        password:userSignUp.password
      })
      
     navigate('/LogIn') 
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='parent-signUp'>
      <div className='main-signUp-box'>

        <div className='welcome'>
          <h1>Welcome</h1>
        </div>

        <div className='create-signUp-account'>
          <div className='create'>
            <h2>Create Account</h2>
          </div>

          <div className='signUp-input'>
            <label htmlFor="name">Username:</label>
            <input onChange={handleChange} type="text" id="name" value={userSignUp.username} name='username' placeholder='Enter your name' />

            <label htmlFor="email">Email:</label>
            <input onChange={handleChange} type="email" id="email" value={userSignUp.email} name='email' placeholder='Enter your email' />

            <label htmlFor="password">Password:</label>
            <input onChange={handleChange} type="password" id='password' value={userSignUp.password} name='password' placeholder='Enter your password' />
          </div>

          <div className='signUp-button'>
            <button onClick={handleSignUp}>SignUp</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUp

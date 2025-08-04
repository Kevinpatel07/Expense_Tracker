import React from 'react'
import { useRef } from 'react'
import api from '../utils/axiosInstance'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Resetpassword = () => {
  const NewRef = useRef()
  const ConfirmRef = useRef()
  const navigate = useNavigate()

  // Agar query string se karte he

  //   import { useSearchParams } from 'react-router-dom'

  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");

  // console.log(token); // Ab yahan token aayega agar URL me ?token=... diya ho

  const { token } = useParams()

  const handleResetPassword = async () => {
    const newPassword = NewRef.current.value.trim()
    const confirmPassword = ConfirmRef.current.value.trim()

    if (newPassword === confirmPassword) {
      await api.post('users/reset-password', {
        token,
        newPassword
      })
      alert('Password Reset Successfully , Please Login Again')
      navigate('/Login')
    }else{
      alert('Passwords do not match')
    }
  }
  return (
    <div className='reset-password'>
      <div className='reset-box1'>
        <div className='reset-p'>
          <p>Please enter and confirm your new password bellow to access your account.</p>
        </div>

        <div className='reset-inputs'>
          <label htmlFor="new">New password:</label>
          <input ref={NewRef} type="password" id="new" />

          <label htmlFor="confirm">Confirm password:</label>
          <input ref={ConfirmRef} type="password" id="confirm" />
        </div>

        <div className='reset-button'>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>


      </div>
      <div className='reset-box2'>
        <h2>Reset Password</h2>
      </div>

    </div>
  )
}

export default Resetpassword

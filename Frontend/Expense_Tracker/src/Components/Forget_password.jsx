import React, { useRef } from 'react'
import api from '../utils/axiosInstance'

const Forget_password = () => {
    const emailRef = useRef()

    const handleResetPassword = async () => {
        const email = emailRef.current.value.trim()

        await api.post('/users/forget-password', {email})

        alert("Password Reset link Send to Registered Mail")
    }
    return (
        <div className='forget-password-parent'>
            <div className='forget-password-page'>
                <div className='box1'>
                    <h2>Forget Password?</h2>
                </div>

                <div className='box2'>
                    <div className='box2-p'>
                        <p>Please enter your email bellow and we will email you with instructions on how to reset your password.</p>
                    </div>

                    <div className='box2-input'>
                        <label htmlFor="email">Email:</label>
                        <input ref={emailRef} type="email" placeholder='Enter your email' id='email' />
                    </div>

                    <div className='box2-button'>
                        <button onClick={handleResetPassword}>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forget_password

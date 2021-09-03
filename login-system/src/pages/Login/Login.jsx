import React from 'react'
import './login.css'

function Login() {
    return (
        <div className='login-page'>
            <div className='login-img'>
                <img src='https://i.imgur.com/9pzQyj2.jpg' alt='Log in'/>
            </div>
            <div className='login-form-box'>
                <h1 className='title'>Elective Management System</h1>
                <form>
                        <p className='input-label'>Username</p>
                        <input id='username' type='text' className='input-box'></input>
                        <p className='input-label'>Password</p>
                        <input id='password' type='password' className='input-box'></input>
                </form>
            </div>
        </div>
    )
}

export default Login

import React from 'react'
import './login.css'

function Login() {
    return (
        <div className='login-page'>
            <div className='login-img'>
                <img src='https://i.imgur.com/9pzQyj2.jpg' alt='Log in'/>
            </div>
            <div className='login-form-box'>
                <h1 className='title'>Elective Management System<span className='dot'>.</span></h1>
                <form autocomplete='off'>
                    <div className='input-group'>
                        <label className='input-label' for='username'>Username</label>
                        <input id='username' type='text' placeholder='CB.EN.U4EEE19101' className='input-box'></input>
                    </div>
                    <div className='input-group'>
                        <label className='input-label' for='password'>Password</label>
                        <input id='password' type='password' placeholder='•••••••••••••••' className='input-box'></input>
                    </div>
                    <button className='login-btn'>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
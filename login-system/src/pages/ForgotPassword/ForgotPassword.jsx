import React, { useState,useRef } from 'react'
import { useAuth } from "../../context/AuthContext"
import { Link,useHistory } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import './forgotPassword.css'

function ForgotPassword() {

    const usernameRef=useRef()
    const passwordRef=useRef()

    const[error,setError]=useState()

    const{ login } = useAuth()

    const history=useHistory()

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{
            setError(false)
            //console.log(usernameRef.current.value.toLowerCase()+'@cb.students.amrita.edu', passwordRef.current.value);
            await login(usernameRef.current.value.toLowerCase()+'@cb.students.amrita.edu',passwordRef.current.value)
            history.push('/')
        }catch{
            setError(true)
            toast.error('Username/Password is incorrect!')
        }
    }

    return (
        <div className='login-page'>
            <Toaster position='top-right'/>
            <div className='login-img'>
                <img src='https://i.imgur.com/9pzQyj2.jpg' alt='Log in'/>
            </div>
            <div className='login-form-box'>
                <div className='title'><h3>Forgot Password?</h3></div>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label className='input-label' htmlFor='username'>Username</label>
                        <input id='username' type='text' placeholder='CB.EN.U4EEE19101' ref={usernameRef} className='input-box' autoFocus required></input>
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor='password'>Password</label>
                        <input id='password' type='password' placeholder='•••••••••••••••' minLength='8' ref={passwordRef} className='input-box' required></input>
                    </div>
                    <div className='input-btn-group'>
                        <button className='login-btn' type='submit'>Log In</button>
                        <Link to='/forgot-password' style={{'text-decoration':'none'}}>Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword

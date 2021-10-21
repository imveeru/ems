import React, { useState,useRef } from 'react'
import { useAuth } from "../../context/AuthContext"
import { Link,useHistory } from "react-router-dom"
import './login.css'
import toast, { Toaster } from 'react-hot-toast';
import {FiEye,FiEyeOff} from 'react-icons/fi'

function Login() {

    const usernameRef=useRef()
    const passwordRef=useRef()

    const[error,setError]=useState()

    const[showPassword,setShowPassword]=useState(false)

    const{ login } = useAuth()

    const history=useHistory()

    const handleShowPassword=()=>{
        setShowPassword(!showPassword)
    }

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
                <h1 className='title'>Elective Management System<span className='dot'>.</span></h1>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label className='input-label' htmlFor='username'>Username</label>
                        <input id='username' type='text' placeholder='CB.EN.U4EEE19101' ref={usernameRef} className='input-box' autoFocus required></input>
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor='password'>Password</label>
                        <input id='password' type={showPassword?'text':'password'} placeholder='•••••••••••••••' minLength='8' ref={passwordRef} className='input-box' required></input>
                        {showPassword?<element className='show-password' onClick={handleShowPassword}><FiEyeOff/></element>:<element className='show-password' type='normal
                        ' onClick={handleShowPassword}><FiEye/></element>}
                    </div>
                    <div className='input-btn-group'>
                        <button className='login-btn' type='submit'>Log In</button>
                        <Link to='/forgot-password' style={{'textDecoration':'none'}}>Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

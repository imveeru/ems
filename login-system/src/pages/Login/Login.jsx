import React, { useState,useRef } from 'react'
import { useAuth } from "../../context/Auth"
import { Link, useHistory } from "react-router-dom"
import './login.css'
import toast, { Toaster } from 'react-hot-toast';

function Login() {

    const usernameRef=useRef()
    const passwordRef=useRef()

    const[error,setError]=useState()

    //const{ login } = useAuth()

    const history=useHistory()

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{
            setError(false)
            console.log(usernameRef.current.value.toLowerCase()+'@cb.students.amrita.edu', passwordRef.current.value);
            //await login(usernameRef.current.value.toLowerCase()+'@cb.students.amrita.edu',passwordRef.current.value)
        }catch{
            setError(true)
        }
    }

    return (
        <div className='login-page'>
            <Toaster/>
            {error&&toast.error('Username/Password is incorrect!')}
            <div className='login-img'>
                <img src='https://i.imgur.com/9pzQyj2.jpg' alt='Log in'/>
            </div>
            <div className='login-form-box'>
                <h1 className='title'>Elective Management System<span className='dot'>.</span></h1>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label className='input-label' htmlFor='username'>Username</label>
                        <input id='username' type='text' placeholder='CB.EN.U4EEE19101' ref={usernameRef} className='input-box' autoFocus></input>
                    </div>
                    <div className='input-group'>
                        <label className='input-label' htmlFor='password'>Password</label>
                        <input id='password' type='password' placeholder='•••••••••••••••' minLength='8' ref={passwordRef} className='input-box'></input>
                    </div>
                    <button className='login-btn' type='submit'>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login

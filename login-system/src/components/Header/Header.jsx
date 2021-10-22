import React,{useState} from 'react'
import './header.css'
import {useAuth} from '../../context/AuthContext'
import {useHistory} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import {Link} from 'react-router-dom'

function Header() {

    const{logout} = useAuth()

    const[error,setError]=useState()

    const history=useHistory()

    const handleLogout=async()=>{
        setError(false)
        try{
            await logout()
            history.push('/login')
        }catch{
            setError(true)
            toast.error('Log out Failed!')

        }
    }

    return (
        <div className='header'>
            <Toaster/>
            <Link to="/" style={{'textDecoration':'none','color': 'black'}}><h2>Elective Management System</h2></Link>
            <button className='logout-btn' onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Header

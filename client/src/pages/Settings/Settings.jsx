import React,{useState,useRef} from 'react'
import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'
import {db} from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import {MdOutlineArrowBackIos} from 'react-icons/md'
import {FiEyeOff,FiEye} from 'react-icons/fi'
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import './Settings.css'

function Settings(props) {

    const {currentUser,updatePassword}=useAuth()

    var isAuthorized = false;

    if(currentUser.uid===props.match.params.userId){
        isAuthorized=true;
    }else{
        isAuthorized=false;
    }

    const{ register, handleSubmit,reset } = useForm();

    const[formData,setFormData] = useState({})
    
    const onSubmit = (data)=>{
        if(data.password===data.confirm_password){
            setFormData(data)
            updatePassword(data.password);
            toast.success('Password updated successfully')
            reset();
        }else{
            toast.error('Password does not match!')
        }
    }

    return (
        <div>
            <Toaster/>
            <Header/>
            <div className="back-btn">
                    <MdOutlineArrowBackIos/>
                    <Link to="/" style={{'textDecoration':'none','color': 'black'}}><h3>Back</h3></Link>
            </div>
            {isAuthorized?
            <div className="settings-container">
                <h2>User Settings</h2>
                <div className="update-password-form">
                    <h2>Update Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className='input-label' htmlFor='password'>Password</label><br/>
                        <input {...register("password")} id='password' placeholder="Enter the new password" minLength="6" type='password' className="settings-input-box"></input>
                        <br/>
                        <label className='input-label' htmlFor='cnfrm-password'>Confirm Password</label><br/>
                        <input {...register("confirm_password")} id='cnfrm-password' placeholder="Enter the new password again" minLength="6" type='password' className="settings-input-box"></input>
                        <br/>
                        <button type="submit" className="add-btn">Update Password</button>
                    </form>
                    {/* <p>{JSON.stringify(formData)}</p> */}
                </div>
            </div>
            :
            <div className="settings-container">
                <h1>🙅 You're not authorized to access this page!</h1>
            </div>
            }
        </div>
    )
}

export default Settings

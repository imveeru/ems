import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import AddStudent from './AddStudent'
import AddFaculty from './AddFaculty'
import toast, { Toaster } from 'react-hot-toast';
import './Adminforms.css'

function AddUser() {

    const{ register, handleSubmit,reset} = useForm();

    const{ register:register2, handleSubmit:handleSubmit2, watch:watch2 } = useForm();

    const[formData,setFormData] = useState({})

    const[uid,setUid] = useState()

    const onSubmit = (data)=>{
        setFormData(data)
        //add user and return uid
        fetch('/addUser',{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          }).then((response)=>{
            if(response.status>=400){
              if(response.status===401){
                throw new Error('User already exists')
              }
              throw new Error("Bad Response from server");
            }
            return response.json();
          }).then((data)=>{
            console.log(data);
            setUid(data.uid);
            toast.success('User added successfully. Enter the details by choosing the role.')
            reset();
          }).catch((err)=>{
            //console.log(err.message);
            toast.error(err.message)
          })
        
    }

    const role=watch2("role");

    return (
        <div className="add-form">
            <Toaster/>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} placeholder="Enter the username" type="text" className="input-box"></input>
            <input {...register("password")} placeholder="Enter the password" type="text" className="input-box"></input>
            <br/><button type="submit" className="add-btn">Add user</button>
            </form>
            <form onSubmit={handleSubmit2(onSubmit)}>
                <span className="labels">Role </span>
                <select {...register2("role") } className="select-btn">
                    <option value="">Select user role...</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
            </form>
            {/* <p>{JSON.stringify(formData)}</p> */}
            {role==='student'?<AddStudent uid={uid}/>:role==='faculty'?<AddFaculty uid={uid}/>:null}
        </div>
    )
}

export default AddUser

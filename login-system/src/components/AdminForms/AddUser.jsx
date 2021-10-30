import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import AddStudent from './AddStudent'
import AddFaculty from './AddFaculty'
import toast, { Toaster } from 'react-hot-toast';

function AddUser() {

    const{ register, handleSubmit } = useForm();

    const{ register:register2, handleSubmit:handleSubmit2, watch:watch2 } = useForm();

    const[formData,setFormData] = useState({})

    const[uid,setUid] = useState()

    const onSubmit = (data)=>{
        setFormData(data)
        //add user and return uid
        fetch('/addUser',{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
          }).then((response)=>{
            if(response.status>=400){
              throw new Error("Bad Response from server");
            }
            return response.json();
          }).then((data)=>{
            //console.log(data);
            setUid(data.uid);
            toast.success('User added successfully. Enter the details by choosing the role.')
          }).catch((err)=>{
            console.log(err);
            toast.error('Unexpected error while adding user.')
          })
    }

    const role=watch2("role");

    return (
        <div className="add-form">
            <Toaster/>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} placeholder="Enter the username" type="text"></input>
            <input {...register("password")} placeholder="Enter the password" type="text"></input>
            <button type="submit">Add user</button>
            </form>
            <form onSubmit={handleSubmit2(onSubmit)}>
                <select {...register2("role")}>
                    <option value="">Select user role...</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
            </form>
            <p>{JSON.stringify(formData)}</p>
            {role==='student'?<AddStudent/>:role==='faculty'?<AddFaculty/>:null}
        </div>
    )
}

export default AddUser

import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import AddStudent from './AddStudent'
import AddFaculty from './AddFaculty'
import {getAuth} from "firebase/auth"

function AddUser() {

    const{ register, handleSubmit,watch } = useForm();

    const[formData,setFormData] = useState({})

    

    const onSubmit = (data)=>{
        setFormData(data)
        // getAuth().createUser({
        //     email:data.username+"@cb.students.amrita.edu",
        //     password:data.password
        // })
        // .then((response)=> {
        //     console.log("User Created Successfully!",response.uid);
        // })
        // .catch((error)=> {
        //     console.error("Error Creating new user",error)
        // });
    }

    const role=watch("role");

    return (
        <div className="add-form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("usernameRef")} placeholder="Enter the username" type="text"></input>
            <input {...register("password")} placeholder="Enter the password" type="text"></input>
            <select {...register("role")}>
                <option value="">Select user role...</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
            </select>
            <button type="submit">Add user</button>
            </form>
            <p>{JSON.stringify(formData)}</p>
            {role==='student'?<AddStudent/>:role==='faculty'?<AddFaculty/>:null}
        </div>
    )
}

export default AddUser

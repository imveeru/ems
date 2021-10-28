import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import AddStudent from './AddStudent'
import AddFaculty from './AddFaculty'

function AddUser() {

    const{ register, handleSubmit,watch } = useForm();

    const[formData,setFormData] = useState()

    const onSubmit = (data)=>setFormData(data)

    const role=watch("role");

    return (
        <div className="add-form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("role")}>
                <option value="">Select user role...</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
            </select>
            {role==='student'?<AddStudent/>:role==='faculty'?<AddFaculty/>:null}
            </form>
        </div>
    )
}

export default AddUser

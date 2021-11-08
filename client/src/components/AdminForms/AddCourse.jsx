import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import {db} from '../../firebase'
import toast, { Toaster } from 'react-hot-toast';

function AddCourse() {

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState()

    const onSubmit = (data)=>{
        setFormData(data)
        db.collection('courses').doc(data.courseCode).set(data)
        .then(()=>{
            toast.success('Course added successfully!')
        })
        .catch((err)=>{
            console.error("Error Adding Document: " + err)
            toast.error("Error Adding Document!")
        })
    }



    return (
        <div className="add-form">
            <Toaster/>
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title")} placeholder="Enter the coures title" className="admin-input-box"></input>
                <input {...register("courseCode")} placeholder="Enter the coures code" className="admin-input-box"/>
                <br/>
                <select {...register("dept")} className="select-btn">
                    <option value="">Select the department</option>
                    <option value="CSE">CSE - Computer Science and Engineering</option>
                    <option value="EEE">EEE - Electrical andd Electronics Engineering</option>
                    <option value="ECE">ECE - Eclectronics and Communications Engineering</option>
                    <option value="MEE">MEE - Mechanical Engineering</option>
                    <option value="AEE">AEE - Aerospace Engineering</option>
                    <option value="ENG">ENG - English</option>
                    <option value="HUM">HUM - Humanites</option>
                </select>
                <br/>
                <select {...register("credits")} className="select-btn">
                    <option value="">Select the credits</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <p>is Professional Elective?
                    <label html-for='yes'>
                        <input {...register("isProfessionalElective")} type='radio' id='yes' name='isProfessionalElective' value='yes'/>
                        Yes
                    </label>
                    <label html-for='no'>
                        <input {...register("isProfessionalElective")} type='radio' id='no' name='isProfessionalElective' value='no'/>
                        No
                    </label>
                </p>

                <textarea {...register("objective")} placeholder="Enter the course objective" className="input-txtbox"/>
                <br/><button type="submit" className="add-btn">Add Course</button>
            </form>
            {/* <p>{JSON.stringify(formData)}</p> */}
        </div>
    )
}

export default AddCourse

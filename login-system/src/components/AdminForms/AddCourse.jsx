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
                <input {...register("title")} placeholder="Enter the coures title"/>
                <input {...register("courseCode")} placeholder="Enter the coures code"/>
                <select {...register("credits")}>
                    <option value="">Select a credit</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <select {...register("dept")}>
                    <option value="">Select the department</option>
                    <option value="CSE">CSE - Computer Science and Engineering</option>
                    <option value="EEE">EEE - Electrical andd Electronics Engineering</option>
                    <option value="ECE">ECE - Eclectronics and Communications Engineering</option>
                    <option value="MEE">MEE - Mechanical Engineering</option>
                    <option value="AEE">AEE - Aerospace Engineering</option>
                    <option value="ENG">ENG - English</option>
                    <option value="HUM">HUM - Humanites</option>
                </select>
                <input {...register("isProfessionalElective")} type='radio' id='Yes' name='isProfessionalElective' value={true}/>
                <input {...register("isProfessionalElective")} type='radio' id='No' name='isProfessionalElective' value={false}/>
                <textarea {...register("objective")} placeholder="Enter the course objective"/>
                <button type="submit">Add Course</button>
            </form>
            <p>{JSON.stringify(formData)}</p>
        </div>
    )
}

export default AddCourse

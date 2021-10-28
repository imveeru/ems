import React,{useState} from 'react'
import { useForm } from "react-hook-form";

function AddCourse() {

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState()

    const onSubmit = (data)=>setFormData(data)


    return (
        <div className="add-form">
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
                <input {...register("isProfessionalElective")} type='radio' id='Yes' name='isProfessionalElective' value='Yes'/>
                <input {...register("isProfessionalElective")} type='radio' id='No' name='isProfessionalElective' value='No'/>
                <textarea {...register("objective")} placeholder="Enter the course objective"/>
                <button type="submit">Add Course</button>
            </form>
            <p>{JSON.stringify(formData)}</p>
        </div>
    )
}

export default AddCourse

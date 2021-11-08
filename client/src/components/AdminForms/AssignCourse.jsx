import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import {db} from '../../firebase'
import toast, { Toaster } from 'react-hot-toast';

function AssignCourse() {
    const{ register, handleSubmit,watch } = useForm();

    const[formData,setFormData] = useState()

    const[courseCodes,setCourseCodes] = useState()

    const[facultyNames,setFacultyNames] = useState()

    const onSubmit = (data)=>{
        setFormData(data)
        // db.collection('electives').doc().set(data)
        // .then(()=>{
        //     toast.success('Course assigned successfully!')
        // })
        // .catch((err)=>{
        //     console.error("Error Adding Document: " + err)
        //     toast.error("Error assigning course!")
        // })
    }

    // const maxLimitNum=watch("maxLimit");


    return (
        <div className="add-form">
            <Toaster/>
            <h2>Assign Course</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("courseCode")} placeholder="Enter the coures code" className="admin-input-box" list='courseCodes'></input>
                <datalist id="courseCodes">
                    <option value="aaa"></option>
                    <option value="bbb"></option>
                </datalist>
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
                <select {...register("batch")} className="select-btn">
                    <option value="">Select the batch</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select>
                <select {...register("sem")} className="select-btn">
                    <option value="">Select the semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <input {...register("faculty")} placeholder="Enter the faculty name" className="admin-input-box"></input>
                <br/>
                <select {...register("maxLimit")} className="select-btn">
                    <option value="">Select the maximum number of slot</option>
                    <option value={15}>15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="75">75</option>
                </select>
                <input {...register(`studentList.${0}`)} type="hidden"></input>
                <br/><button type="submit" className="add-btn">Assign Course</button>
            </form>
            <p>{JSON.stringify(formData)}</p>
        </div>
    )
}

export default AssignCourse

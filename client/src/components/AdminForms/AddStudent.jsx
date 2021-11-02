import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import {db} from '../../firebase'

function AddStudent({uid}) {

    const{ register, handleSubmit,reset } = useForm();

    const[formData,setFormData] = useState({})

    const onSubmit = (data)=>{
        setFormData(data)
        db.collection('users').doc(uid).set(data)
        .then(()=>{
            toast.success('Details saved successfully!')
            reset();
        })
        .catch((err)=>{
            console.error("Error Adding Document: " + err)
            toast.error("Error saving details!")
        })
    }

    return (
        <div>
            <Toaster/>
            <h2>Student Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} type="text" placeholder="Enter Name"></input>
                <input {...register("regNo")} type="text" placeholder="Enter register number"></input>
                <select {...register("program")}>
                    <option value="">Select the program</option>
                    <option value="BTech">BTech</option>
                    <option value="BSc">BSc.</option>
                </select>
                <select {...register("branch")}>
                    <option value="">Select the department</option>
                    <option value="CSE">CSE - Computer Science and Engineering</option>
                    <option value="EEE">EEE - Electrical andd Electronics Engineering</option>
                    <option value="ECE">ECE - Eclectronics and Communications Engineering</option>
                    <option value="MEE">MEE - Mechanical Engineering</option>
                    <option value="AEE">AEE - Aerospace Engineering</option>
                    <option value="ENG">ENG - English</option>
                    <option value="HUM">HUM - Humanites</option>
                </select>
                <select {...register("currentSem")}>
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
                <select {...register("section")}>
                    <option value="">Select the section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                <input {...register("yearJoined")} type="number" placeholder="YYYY" maxLength="4" min="2015" max={new Date().getFullYear()} />
                <input {...register("role")} value="student" type="hidden"></input>
                <button type="submit">Save Details</button>
            </form>
            {<p>{JSON.stringify(formData)}</p>}
        </div>
    )
}

export default AddStudent

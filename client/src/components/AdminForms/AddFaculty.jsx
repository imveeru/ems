import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import {db} from '../../firebase'

function AddStudent({uid}) {

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState({})

    const onSubmit = (data)=>{
        setFormData(data)
        db.collection('users').doc(uid).set(data)
        .then(()=>{
            toast.success('Details saved successfully!')
        })
        .catch((err)=>{
            console.error("Error Adding Document: " + err)
            toast.error("Error saving details!")
        })
    }

    return (
        <div>
            <Toaster/>
            <h2>Faculty Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} type="text" placeholder="Enter Name" className="input-box"></input>
                <br/><select {...register("grade")} className="select-btn">
                    <option value="">Select the grade</option>
                    <option value="Chairperson">Chairperson</option>
                    <option value="Vice Chairperson">Vice Chairperson</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Senior Professor">Senior Professor</option>
                </select>
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
                <input {...register("role")} value="faculty" type="hidden"></input>
                <br/><button type="submit" className="add-btn">Save Details</button>
            </form>
            {/* {<p>{JSON.stringify(formData)}</p>} */}
        </div>
    )
}

export default AddStudent

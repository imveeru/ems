import React,{useState} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { useForm } from "react-hook-form";
import {db} from '../../firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';

function AssignDate() {

    const{ register, handleSubmit,setValue } = useForm();

    const [formData,setFormData] =useState()

    const[startDate,setStartDate]=useState(new Date())
    const[endDate,setEndDate]=useState(new Date())

    const handleSelectStartDate=(date)=>{
        setStartDate(date)
        setValue('startDate', date)
        console.log('Start date: ',date)
    }

    const handleSelectEndDate=(date)=>{
        setEndDate(date)
        setValue('endDate', date)
        console.log('End date: ',date)
    }

    const onSubmit=(data)=>{
        setFormData(data)
        db.collection('electiveDates').doc(data.batch+"_"+data.sem+"_"+data.dept).set(data)
        .then(()=>{
            toast.success('Date assigned successfully!')
        })
        .catch((error)=>{
            console.error('Error assigning date: ',error)
            toast.error('Error assigning date!')
        })
    }

    return (
        <div>
            <h2>Assign Date</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="calendars">
                    
                        <div className="calendar">
                            <p>Start Date</p> 
                            <Calendar
                                date={startDate}
                                onChange={handleSelectStartDate}
                                name="startDate"
                                innerRef={register('')}
                            />
                        </div>

                        <div className="calendar">
                            <p>End Date</p> 
                            <Calendar
                                date={endDate}
                                onChange={handleSelectEndDate}
                                name="endDate"
                                innerRef={register('')}
                            />
                        </div>
                        
                </div>

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

                <select {...register("maxNoOfElectives")} className="select-btn">
                    <option value="">Select the maximum number of electives</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <button type="submit" className="add-btn">Assign Date</button>
            </form>
            {/* <p>{JSON.stringify(formData)}</p> */}
        </div>
    )
}

export default AssignDate

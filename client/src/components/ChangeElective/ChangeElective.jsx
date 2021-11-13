import React,{useState} from 'react'
import { doc, getDoc } from "firebase/firestore";
import './ChangeElective.css'
import {useForm} from 'react-hook-form'
import {db} from '../../firebase'
import { useEffect } from 'react';

function ChangeElective({alreadyEnrolledCourses,userData,assignedCourses}) {

    const[courseData,setCourseData]=useState([])

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState({})

    const onSubmit = (data)=>{
        setFormData(data)
    }

    const fetchCourseData=()=>{
        var courseDataList=[]
        alreadyEnrolledCourses.forEach(async (course) =>{
            const docRef = doc(db, "electives", course+"_"+userData.yearJoined+"_"+userData.currentSem+"_"+userData.branch);
            const docSnap = await getDoc(docRef);
            if(docSnap){
                courseDataList.push(docSnap.data());
            }
        })
        setCourseData(courseDataList)
    }
    
    useEffect(() => {
        fetchCourseData()
    },[])

    return (
        <div className='change-elective-container'>
            <h2>Change Elective<span className='title-tooltip'> Select the course you wish to change and send request to the respective handling faculty.</span></h2>
            <p>Enrolled Courses
            <div className='user-details'>
                {alreadyEnrolledCourses.map((course, index) =>(
                    <p key={index}>{course}</p>
                ))}
            </div>
            </p>
            {/* <p>{JSON.stringify(userData)}</p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register("alreadyEnrolled")}  placeholder="Choose the course you wish to change" className="select-btn">
                    <option value="">Select the course you wish to opt out...</option>
                    {
                        alreadyEnrolledCourses.map((course,index)=>(
                            <option key={index} value={course}>{course}</option>
                        ))
                    }
                </select>
                <select {...register("alreadyEnrolled")}  placeholder="Choose the course you wish to change" className="select-btn">
                    <option value="">Select the course you wish to replace with...</option>
                    {
                        assignedCourses.map((course,index)=>(
                            <option key={index} value={course.courseCode}>{course.courseCode}</option>
                        ))
                    }
                </select>
                <button type='submit' className='add-btn'>Request Change</button>
            </form>
        </div>
    )
}

export default ChangeElective

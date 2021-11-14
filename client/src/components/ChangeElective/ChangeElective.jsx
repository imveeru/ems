import React,{useState} from 'react'
import { doc, getDoc } from "firebase/firestore";
import './ChangeElective.css'
import {useForm} from 'react-hook-form'
import {db} from '../../firebase'
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function ChangeElective({alreadyEnrolledCourses,userData,assignedCourses}) {

    const[courseData,setCourseData]=useState([])

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState({})

    const onSubmit = (data)=>{
        setFormData(data)
        console.log(data)
        
        if(alreadyEnrolledCourses.includes(data.newElective.split("_")[0])){
            toast.error("Cannot change with already Enrolled Courses")
        }else if(data.alreadyEnrolled!==data.newElective.split("_")[0]){
            db.collection('changeRequests').doc().set(data)
            .then(()=>{
                toast.success('Request sent to the respective faculty!')
            })
            .catch((err)=>{
                console.error("Error Adding Document: " + err)
                toast.error("Error sending request!")
            })
        }else{
            toast.error("Cannot change with same course")
        }
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
            <Toaster/>
            <h2>Change Elective<span className='title-tooltip'> Select the course you wish to change and send request to the respective handling faculty.</span></h2>
            <p>Enrolled Courses</p>
            <div className='user-details'>
                {alreadyEnrolledCourses.map((course, index) =>(
                    <p key={index}>{course}</p>
                ))}
            </div>
            {/* <p>{JSON.stringify(userData)}</p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register("alreadyEnrolled")}  placeholder="Choose the course you wish to change" className="select-btn">
                    <option value="">Select the course you wish to opt out...</option>
                    {
                        alreadyEnrolledCourses.map((course,index)=>(
                            <option key={index} value={course+"_"+userData.yearJoined+"_"+userData.currentSem+"_"+userData.branch}>{course}</option>
                        ))
                    }
                </select>
                <select {...register("newElective")}  placeholder="Choose the course you wish to change" className="select-btn">
                    <option value="">Select the course you wish to replace with...</option>
                    {
                        assignedCourses.map((course,index)=>(
                            <option key={index} value={course.courseCode+"_"+userData.yearJoined+"_"+userData.currentSem+"_"+userData.branch}>{course.courseCode}</option>
                        ))
                    }
                </select>
                {/* <input {...register("receiver")} type="hidden" value={userData.regNo}></input> */}
                <input {...register("sender")} type="hidden" value={userData.regNo}></input>
                <input {...register("isApproved")} type="hidden" value="no"></input>
                <input {...register("decisionMade")} type="hidden" value="no"></input>
                <input {...register("isSeenByStudent")} type="hidden" value="no"></input>
                <button type='submit' className='add-btn'>Request Change</button>
            </form>
        </div>
    )
}

export default ChangeElective

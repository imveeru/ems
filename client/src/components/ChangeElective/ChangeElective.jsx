import React,{useState} from 'react'
import { doc, getDoc } from "firebase/firestore";
import './ChangeElective.css'
import {db} from '../../firebase'
import { useEffect } from 'react';

function ChangeElective({alreadyEnrolledCourses,userData}) {

    const[courseData,setCourseData]=useState([])

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
            <p>{JSON.stringify(userData)}</p>
        </div>
    )
}

export default ChangeElective

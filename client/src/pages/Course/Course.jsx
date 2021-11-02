import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {db} from '../../firebase'
import './Course.css'

function Course(props) {
    console.log(props.match.params.courseId);
    const courseDbRef=db.collection('courses')

    const[course,setCourse]=useState({})

    const fetchUserData=async()=>{
        const res=courseDbRef.doc(props.match.params.courseId)
        await res.onSnapshot((doc)=>{
            setCourse(doc.data())
        })
    }


    useEffect(()=>{
        fetchUserData()
    },[])

    return (
        <div>
            <Header/>
            {/* {course?'Irukku':'illa'} */}
            <div className="course-container">
                <p className="course-title">{course.title}</p>
                <div className="course-spec">
                    <p>{course.courseCode}</p>
                    <p>Provided by - {course.dept} Dept.</p>
                    <p>Credits - {course.credits}</p>
                    <p>{course.isProfessionalElective==='yes'?'Professional Elective':'Free Elective'}</p>
                </div>
                <p className="course-desc-title">Course Objective</p>
                <p className="course-desc">{course.objective}</p>
            </div>
        </div>
    )
}

export default Course

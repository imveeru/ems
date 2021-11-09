import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'
import {db} from '../../firebase'
import './Course.css'
import {MdOutlineArrowBackIos} from 'react-icons/md'

function Course(props) {
    //console.log(props.match.params.courseId);
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
            <div className="back-btn">
                    <MdOutlineArrowBackIos/>
                    <Link to="/" style={{'textDecoration':'none','color': 'black'}}><h3>Back</h3></Link>
            </div>
            {course?
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
            :
               <div className="course-container">
                   <p className="course-title">😢 Oops! Course details not found.</p>
               </div> 
            }
        </div>
    )
}

export default Course

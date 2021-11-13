import React,{useState} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import './AssignedElective.css'
import { useForm } from "react-hook-form";


function AssignedElective({assignedCourses}) {

    const{ register, handleSubmit}=useForm();

    const[formData,setFormData]=useState();

    const onSubmit = (data)=>{
        setFormData(data)
    }

    return (
            <>        
                {assignedCourses.map((assignedCourse,index)=>(
                        <div key={index}>
                            <div className="assigned-elective">
                                    <CircularProgressbar
                                            value={parseInt(assignedCourse.studentList.length)-1}
                                            text={`${parseInt(parseInt(assignedCourse.maxLimit)-parseInt(assignedCourse.studentList.length)+1)}/${assignedCourse.maxLimit}`}
                                            styles={buildStyles({
                                                textSize: "14px",
                                                pathColor: 'rgba(46,106,218)',
                                                textColor: 'rgba(46,106,218)',
                                                trailColor: 'rgba(46,106,218,0.1)'
                                            })}
                                            strokeWidth={15}
                                            minValue={0}
                                            maxValue={parseInt(assignedCourse.maxLimit)}
                                            className='elective-progress-bar'
                                    ></CircularProgressbar>
                                    <div className="assigned-elective-details">
                                        <Link className="assigned-course-title" to={"/course/"+assignedCourse.courseCode+"/"+assignedCourse.faculty} style={{'textDecoration':'none','color':'black'}}><p className='elective'>{assignedCourse.courseCode}</p></Link>
                                        <p>Faculty - <strong>{assignedCourse.faculty}</strong></p>
                                    </div>
                            </div>
                            <p></p>
                        </div>
                    ))}
            </>
    )
}

export default AssignedElective

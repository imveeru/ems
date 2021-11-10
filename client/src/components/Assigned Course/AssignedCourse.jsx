import React,{useState, useEffect} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import {MdExpandMore,MdExpandLess} from 'react-icons/md'
import { useForm } from "react-hook-form";
import {db} from '../../firebase'

function AssignedCourse({assignedCourse}) {

    const [expanded, setExpanded] = useState(false)

    const{register,handleSubmit,watch}=useForm();

    const[wannaChange,setWannaChange]=useState(false);

    const fetchCourseData=async()=> {

    }

    useEffect(()=>{
        fetchCourseData();
    },[])

    return (
        <div className="course-assigned">
                    <div  key={assignedCourse.courseCode} className="assigned-course">
                        
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
                            className='progress-bar'
                        ></CircularProgressbar>

                        <div className="assigned-course-details">
                            <Link className="assigned-course-title" to={"/course/"+assignedCourse.courseCode} style={{'textDecoration':'none','color':'black'}}><p className='elective'>{assignedCourse.courseCode}</p></Link>
                            <p>{assignedCourse.batch} Batch - {assignedCourse.dept} Dept. - Semester {assignedCourse.sem}</p>
                        </div>
                        
                        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
                              {expanded?<MdExpandLess/>:<MdExpandMore/>}
                        </button>
                        <br/>

                            {expanded&&
                            (
                            <div className="hidden-div">
                            <table className="studentList">
                                <tr>
                                    <th>Student Roll Number</th>
                                </tr>
                                {assignedCourse.studentList.map((student)=>(
                                    <tr key={student}>
                                        <td>{student}</td>
                                    </tr>
                                ))}
                            </table>
                            <form onSubmit={handleSubmit()}>
                                <p>Do you wish to change the limit?
                                    <label html-for='yes'>
                                        <input {...register("limitChange")} type='radio' id='yes' name='limitChange' onChange={()=>setWannaChange(!wannaChange)} value='yes'/>
                                        Yes
                                    </label>
                                    <label html-for='no'>
                                        <input {...register("limitChange")} defaultChecked type='radio' id='no' name='limitChange' onChange={()=>setWannaChange(!wannaChange)} value='no'/>
                                        No
                                    </label>
                                </p>
                                <label html-for='max-limit'>Maximum Limit</label>
                                <input {...register("maxLimit")} value={assignedCourse.maxLimit} disabled={wannaChange?"":"disabled"} id='max-limit' className='max-limit' type='number'></input>
                                <input {...register("electiveId")} type='hidden' value={}></input>    
                            </form>
                            </div>
                            )
                            }

                    </div>
                   
            </div>
    )
}

export default AssignedCourse

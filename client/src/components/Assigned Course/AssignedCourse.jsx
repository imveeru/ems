import React,{useState} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import {MdExpandMore,MdExpandLess} from 'react-icons/md'

function AssignedCourse({assignedCourse}) {

    const [expanded, setExpanded] = useState(false)

    return (
        <div className="course-assigned">
                        <div  key={assignedCourse.courseCode} className="assigned-course">
                        
                        <CircularProgressbar
                            value={parseInt(assignedCourse.studentList.length)}
                            text={`${parseInt(assignedCourse.maxLimit)-parseInt(assignedCourse.studentList.length)}/${assignedCourse.maxLimit}`}
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
                        {/* <p>{assignedCourse.faculty}</p> */}
                        
                        {/* <p>Max Sots : {assignedCourse.maxLimit}</p>
                        <p>Remaining Slots : {assignedCourse.maxLimit-assignedCourse.studentList.length}</p> */}

                            {expanded&&(<table className="studentList">
                                <tr>
                                    <th>Student Roll Number</th>
                                </tr>
                                {assignedCourse.studentList.map((student)=>(
                                    <tr key={student}>
                                        <td>{student}</td>
                                    </tr>
                                ))}
                            </table>)}
                        </div>
                   
                </div>
    )
}

export default AssignedCourse
import React from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import './AssignedElective.css'

function AssignedElective({assignedCourse}) {
    return (
        <div>
            <div className="assigned-elective">
                    <form>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                    </form>
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
                        <Link className="assigned-course-title" to={"/course/"+assignedCourse.courseCode} style={{'textDecoration':'none','color':'black'}}><p className='elective'>{assignedCourse.courseCode}</p></Link>
                        <p>Faculty - <strong>{assignedCourse.faculty}</strong></p>
                    </div>
            </div>
        </div>
    )
}

export default AssignedElective

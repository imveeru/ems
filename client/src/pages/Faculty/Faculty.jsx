import React,{useState,useEffect} from 'react'
import {db} from '../../firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './Faculty.css'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Faculty({userData}) {

    const[assignedCourses,setAssignedCourses]=useState([])

    const q = query(collection(db, "electives"), where("faculty", "==", userData.name));

    const fetchUserData=async()=>{

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const assignedCourse = [];
            querySnapshot.forEach((doc) => {
                assignedCourse.push(doc.data());
            });

            //console.log(assignedCourse);
            setAssignedCourses(assignedCourse);
        });
    }

    useEffect(()=>{
        fetchUserData();
    },[])

    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!</h1>
                <div className="user-details">
                    <p>{userData.dept}</p>
                    <p>{userData.grade}</p>
                </div>
                <div className="course-assigned">
                    {assignedCourses.map((assignedCourse)=>(
                        <div className="assigned-course">
                        
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

                        <Link to={"/course/"+assignedCourse.courseCode} style={{'textDecoration':'none','color':'black'}}><p className='elective'>{assignedCourse.courseCode}</p></Link>
                        <p>{assignedCourse.batch} Batch - {assignedCourse.dept} Dept. - Semester {assignedCourse.sem}</p>
                        
                        {/* <p>{assignedCourse.faculty}</p> */}
                        
                        {/* <p>Max Sots : {assignedCourse.maxLimit}</p>
                        <p>Remaining Slots : {assignedCourse.maxLimit-assignedCourse.studentList.length}</p> */}

                        <table className="studentList">
                            <tr>
                                <th>Student Roll Number</th>
                            </tr>
                            {assignedCourse.studentList.map((student)=>(
                                <tr>
                                    <td>{student}</td>
                                </tr>
                            ))}
                        </table>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default Faculty

import React,{useState,useEffect} from 'react'
import {db} from '../../firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import './Faculty.css'
import AssignedCourse from '../../components/Assigned Course/AssignedCourse';
import ChangeElectiveRequests from '../../components/ChangeElectiveRequests/ChangeElectiveRequests';

function Faculty({userData}) {

    const[assignedCourses,setAssignedCourses]=useState([])

    const[changeRequests,setChangeRequests]=useState([])

    const q = query(collection(db, "electives"), where("faculty", "==", userData.name));

    const fetchUserData=async()=>{
        var assignedCourse = [];
        onSnapshot(q, (querySnapshot) => {
            assignedCourse.splice(0,assignedCourse.length)
            
            querySnapshot.forEach((doc) => {
                assignedCourse.push(doc.data());
            });

            setAssignedCourses(assignedCourse)
        });
        //console.log(assignedCourse);


    }

    const fetchChangeRequests=async ()=>{
        var changeRequest=[];
        assignedCourses.forEach((course)=>{
            const queryForRequest = query(collection(db, "changeRequests"), where("newElective", "==", course.courseCode+"_"+course.batch+"_"+course.sem+"_"+course.dept));
            onSnapshot(queryForRequest, (querySnapshot) => {
                //changeRequest.splice(0,changeRequest.length)
                
                querySnapshot.forEach((doc) => {
                    changeRequest.push(doc.data());
                    // console.log(doc.data());
                });
                //console.log(changeRequest)
                setChangeRequests(changeRequest)
            });
            
        })
        
    }

    useEffect(()=>{
        fetchUserData();
    },[])

    useEffect(()=>{
        fetchChangeRequests()
    },[assignedCourses,changeRequests])


    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!</h1>
                <div className="user-details">
                    <p>{userData.dept}</p>
                    <p>{userData.grade}</p>
                </div>
                <div className="content-container">
                    <div className="assignedCourses">
                    <h2>Assigned Elective Courses</h2>
                    {
                        assignedCourses.map(assignedCourse=>(
                            <AssignedCourse key={assignedCourse.courseCode} assignedCourse={assignedCourse}></AssignedCourse>
                        ))
                    }
                    </div>
                    <div className="change-request">
                        <h2>Elective Change Requests</h2>
                        {changeRequests.length>0?
                            (changeRequests.map(changeRequest=>(
                                changeRequest.decisionMade==="no"?
                                <ChangeElectiveRequests request={changeRequest}></ChangeElectiveRequests>
                                :<p>No new requests received.</p>
                            ))):(
                                // <p>No new requests received.</p>
                                <></>
                            )
                        }
                    </div>
                </div>
                    {/* <p>{JSON.stringify(assignedCourses[0])}</p> */}
            </div>
    )
}

export default Faculty

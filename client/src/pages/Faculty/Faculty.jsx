import React,{useState,useEffect} from 'react'
import {db} from '../../firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import './Faculty.css'
import AssignedCourse from '../../components/Assigned Course/AssignedCourse';

function Faculty({userData}) {

    const[assignedCourses,setAssignedCourses]=useState([])

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
        console.log(assignedCourses);
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
                    {
                        assignedCourses.map(assignedCourse=>(
                            <AssignedCourse key={assignedCourse.courseCode} assignedCourse={assignedCourse}></AssignedCourse>
                        ))
                    }
                    {/* <p>{JSON.stringify(assignedCourses[0])}</p> */}
            </div>
    )
}

export default Faculty

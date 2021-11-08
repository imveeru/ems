import React,{useState,useEffect} from 'react'
import {db} from '../../firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import './Faculty.css'
import AssignedCourse from '../../components/Assigned Course/AssignedCourse';

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
                
                {
                    assignedCourses.map(assignedCourse=>(
                        <AssignedCourse key={assignedCourse.courseCode} assignedCourse={assignedCourse}></AssignedCourse>
                    ))
                }
            </div>
    )
}

export default Faculty

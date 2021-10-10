import React,{ useState,useEffect} from 'react'
import { getDocs, collection } from "firebase/firestore";
import {db} from '../../firebase'
import {useAuth} from '../../context/AuthContext'

function Student({userData,docRef}) {

    const [electives,setElectives]=useState({});

    const {currentUser}=useAuth()

    const fetchUserData=async()=>{
        const docsSnap = await getDocs(collection(db,`users/${currentUser.uid}/electives`));
        docsSnap.forEach((doc) => {
            //console.log(doc.data());
            setElectives(doc.data());
            console.log(electives); 
        });
    }

    useEffect(()=>{
        fetchUserData()
    })
    
    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!<span className="user-regno">   [{userData.regNo}]</span></h1>
                <div className="user-details">
                    <p>{userData.program} {userData.branch}</p>
                    <p>{userData.yearJoined} Batch</p>
                    <p>{userData.section} - Section</p>
                    <p>Semester - {userData.currentSem}</p>
                </div>
            </div>
    )
}

export default Student

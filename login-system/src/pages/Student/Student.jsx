import React,{ useState,useEffect} from 'react'
import { getDocs, collection,query,orderBy } from "firebase/firestore";
import {db} from '../../firebase'
import {useAuth} from '../../context/AuthContext'

function Student({userData}) {

    const [electives,setElectives]=useState([]);

    const {currentUser}=useAuth()

    const fetchUserData=async()=>{
        const q=query(collection(db,`users/${currentUser.uid}/electives`),orderBy('sem','asc'))
        const docsSnap = await getDocs(q);
        setElectives(docsSnap.docs);
        console.log(docsSnap.docs[1].data())
        docsSnap.forEach((doc) => {
            //console.log(docsSnap.doc);
            setElectives(electives=>[...electives,doc.data()]);
        });
    }

    useEffect(()=>{
        fetchUserData()
    },[])
    
    //console.log(electives); 

    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!<span className="user-regno">   [{userData.regNo}]</span></h1>
                <div className="user-details">
                    <p>{userData.program} {userData.branch}</p>
                    <p>{userData.yearJoined} Batch</p>
                    <p>{userData.section} - Section</p>
                    <p>Semester - {userData.currentSem}</p>
                </div>
                {
                    electives.forEach((elective) => {
                        <p>elective.data</p>
                    })
                }
            </div>
    )
}

export default Student

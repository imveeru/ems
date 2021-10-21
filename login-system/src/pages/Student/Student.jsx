import React,{ useState,useEffect} from 'react'
import { getDocs, collection,query,orderBy } from "firebase/firestore";
import {db} from '../../firebase'
import {useAuth} from '../../context/AuthContext'

import ElectiveList from '../../components/ElectiveList/ElectiveList'

function Student({userData}) {

    const [electives,setElectives]=useState([]);

    const {currentUser}=useAuth()

    const fetchUserData=async()=>{
        const q=query(collection(db,`users/${currentUser.uid}/electives`),orderBy('sem','asc'))
        const docsSnap = await getDocs(q);
        //console.log("5th Sem - ",docsSnap.docs[4].data())

        const electiveList=[]
        docsSnap.docs.forEach((docs=>electiveList.push(docs.data())))
        //docsSnap.docs.forEach((docs=>console.log(docs.data())))
        //console.log(electiveList)
        //const electivesList=[...electives,electiveList]
        setElectives(electiveList)
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
                <ElectiveList electives={electives}/>
                {/* {electives.length!==0?<p>{electives[0][4].elective_2}</p>:<p>Illa</p>} */}
            </div>
    )
}

export default Student

import React,{ useState,useEffect} from 'react'

function Student({userData,docRef}) {

    const userDocRef=docRef.collection('electives').doc()

    const [electives,setElectives]=useState({});

    const fetchUserData=async()=>{
        const data=await userDocRef.get();
        data.then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                console.log(doc.id,'=>',doc.data())
            })
        })
        //setElectives(data.data())
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

import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'
import {db} from '../../firebase'
import './home.css'

function Home() {

    const {currentUser}=useAuth()
    //console.log(currentUser)

    const[userData,setUserData]=useState({})

    const userDbRef=db.collection('users')

    const fetchUserData=async()=>{
        const res=userDbRef.doc(currentUser.uid)
        const data=await res.get()
        setUserData(data.data())
        //console.log(userData);
    }

    useEffect(()=>{
        fetchUserData()
    })

    return (
        <div>
            <Header />
            <div className="home-container">
                <h1>Welcome {userData.name}!<span className="user-regno">   [{userData.regNo}]</span></h1>
                <div className="user-details">
                    <p>{userData.program} {userData.branch}</p>
                    <p>{userData.yearJoined} Batch</p>
                    <p>{userData.section} - Section</p>
                    <p>Semester - {userData.currentSem}</p>
                </div>
            </div>
        </div>
    )
}

export default Home

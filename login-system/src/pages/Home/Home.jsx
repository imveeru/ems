import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'
import {db} from '../../firebase'
import './home.css'
import Student from '../Student/Student'
impot

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
            {userData.role==='student'?<Student userData={userData}/>:null}
            {userData.role==='faculty'?<Faculty userData={userData}/>:null}
        </div>
    )
}

export default Home

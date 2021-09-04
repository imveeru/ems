import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'
import {db} from '../../firebase'
import './home.css'
import Student from '../Student/Student'

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
            <Student userData={userData}/>
        </div>
    )
}

export default Home

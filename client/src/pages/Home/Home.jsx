import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'
import {db} from '../../firebase'
import './home.css'
import Student from '../Student/Student'
import Faculty from '../Faculty/Faculty'
import Admin from '../Admin/Admin'

function Home() {

    const {currentUser}=useAuth()
    //console.log(currentUser)

    const[userData,setUserData]=useState({})

    const userDbRef=db.collection('users')

    const fetchUserData=async()=>{
        const res=userDbRef.doc(currentUser.uid)
        await res.onSnapshot((doc)=>{
            setUserData(doc.data())
        })
        //const userDocRef=res.collection('electives').doc()
        //console.log(userDocRef);
    }

    useEffect(()=>{
        fetchUserData()
    })

    return (
        <div>
            <Header />
            {userData.role==='student'?<Student userData={userData}/>:null}
            {userData.role==='faculty'?<Faculty userData={userData}/>:null}
            {userData.role==='admin'?<Admin userData={userData}/>:null}
        </div>
    )
}

export default Home

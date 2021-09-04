import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'
import {db} from '../../firebase'
import './home.css'

function Home() {

    const {currentUser}=useAuth()
    //console.log(currentUser)

    //const[userData,setUserData]=useState()

    const userDbRef=db.collection('users')

    const fetchUserData=async()=>{
        const res=userDbRef.doc(currentUser.uid)
        const data=await res.get()
        console.log(data.data())
    }

    useEffect(()=>{
        fetchUserData()
    })

    return (
        <div>
            <Header />
            <div className="home-container">
                <h1>Welcome {currentUser.uid}</h1>
            </div>
        </div>
    )
}

export default Home

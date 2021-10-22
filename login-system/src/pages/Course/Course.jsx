import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {db} from '../../firebase'

function Course(props) {
    console.log(props.match.params.courseId);
    const courseDbRef=db.collection('courses')

    const[course,setCourse]=useState({})

    const fetchUserData=async()=>{
        const res=courseDbRef.doc(props.match.params.courseId)
        await res.onSnapshot((doc)=>{
            setCourse(doc.data())
        })
    }

    useEffect(()=>{
        fetchUserData()
    })

    return (
        <div>
            <Header/>
            {course?'Irukku':'illa'}
        </div>
    )
}

export default Course

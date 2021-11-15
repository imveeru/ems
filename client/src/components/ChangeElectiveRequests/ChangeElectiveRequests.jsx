import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { collection, query, where, onSnapshot,updateDoc, arrayUnion,doc } from "firebase/firestore";
import {db} from '../../firebase'

function ChangeElectiveRequests({request}) {

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState({})

    const handleApprove=()=>{

    }

    const handleReject=async (data)=>{
        setFormData(data)
        let reqRef=doc(db,"changeRequests",data.requestId)
            await updateDoc(reqRef, {
            decisionMade:"yes"
        });
    }

    return (
        <div className="request">
            <p><strong>{request.sender}</strong> has requested you to change his/her elective from <strong>{request.alreadyEnrolled.split("_")[0]}</strong> to <strong>{request.newElective.split("_")[0]}</strong></p>
            <form>
            <input type="hidden" {...register("requestId")} value={request.alreadyEnrolled+"_to_"+request.newElective+"_from_"+request.sender} ></input>
            <button className="add-btn" onClick={handleSubmit(handleApprove)}>Approve</button>
            <button className="reject-btn" onClick={handleSubmit(handleReject)}>Reject</button>
            </form>
        </div>
    )
}

export default ChangeElectiveRequests

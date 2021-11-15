import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { collection, onSnapshot,updateDoc,doc, arrayRemove, arrayUnion } from "firebase/firestore";
import {db} from '../../firebase'
import toast, { Toaster } from 'react-hot-toast';

function ChangeElectiveRequests({request}) {

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState({})

    const handleApprove=async (data)=>{
        setFormData(data)
        let reqRef=doc(db,"changeRequests",data.requestId)
        await updateDoc(reqRef, {
            decisionMade:"yes",
            isApproved:"yes"
        });

        // remove from old course
        let removeRef=doc(db,"electives",data.alreadyEnrolled)
        await updateDoc(removeRef, {
            studentList:arrayRemove(data.sender)
        });

        //add in new course
        let addRef=doc(db,"electives",data.newElective)
        await updateDoc(addRef, {
            studentList:arrayUnion(data.sender)
        });

        toast.success('Request approved!')

    }

    const handleReject=async (data)=>{
        setFormData(data)
        let reqRef=doc(db,"changeRequests",data.requestId)
        await updateDoc(reqRef, {
            decisionMade:"yes"
        });
        toast.success('Request Rejected!')
    }

    return (
        <div className="request">
            <Toaster/>
            <p><strong>{request.sender}</strong> has requested you to change his/her elective from <strong>{request.alreadyEnrolled.split("_")[0]}</strong> to <strong>{request.newElective.split("_")[0]}</strong></p>
            <form>
            <input type="hidden" {...register("alreadyEnrolled")} value={request.alreadyEnrolled} ></input>
            <input type="hidden" {...register("newElective")} value={request.newElective} ></input>
            <input type="hidden" {...register("sender")} value={request.sender} ></input>
            <input type="hidden" {...register("requestId")} value={request.alreadyEnrolled+"_to_"+request.newElective+"_from_"+request.sender} ></input>
            <button className="add-btn" onClick={handleSubmit(handleApprove)}>Approve</button>
            <button className="reject-btn" onClick={handleSubmit(handleReject)}>Reject</button>
            </form>
        </div>
    )
}

export default ChangeElectiveRequests

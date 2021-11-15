import React,{useState} from 'react'
import { collection, onSnapshot,updateDoc,doc, arrayRemove, arrayUnion } from "firebase/firestore";
import {useForm} from 'react-hook-form'
import {db} from '../../firebase'

function ChangeElectiveDecisions({decisions}) {

    const{ register, handleSubmit } = useForm();

    const[formData,setFormData] = useState({})

    const handleOkay=async (data)=>{
        setFormData(data)
        let docRef=doc(db,"changeRequests",data.requestId)
        await updateDoc(docRef, {
            isSeenByStudent:"yes"
        });
    }

    return (
        <>
            {decisions.decisionMade==="yes"?(
                decisions.isSeenByStudent!=="yes"?
                (<div className="decision">
                <p>The request to change from <strong>{decisions.alreadyEnrolled.split("_")[0]}</strong> to <strong>{decisions.newElective.split("_")[0]}</strong> {decisions.isApproved==="yes"?"has been approved.":decisions.isApproved==="no"?"has been rejected.":null}</p>
                <form>
                    <input type="hidden" {...register('requestId')} value={decisions.alreadyEnrolled+"_to_"+decisions.newElective+"_from_"+decisions.sender}></input>
                    <button className="ok-btn" onClick={handleSubmit(handleOkay)} disabled={decisions.isSeenByStudent==="yes"?true:false}>Okay</button>
                </form>
                </div>)
                :(<p>Decisions are already read. Nothing new!👋</p>)
            ):(<p>Decisions are yet to be received!</p>)}
        </>
    )
}

export default ChangeElectiveDecisions

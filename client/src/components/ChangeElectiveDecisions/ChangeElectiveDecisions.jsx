import React from 'react'
import { collection, onSnapshot,updateDoc,doc, arrayRemove, arrayUnion } from "firebase/firestore";
import {db} from '../../firebase'

function ChangeElectiveDecisions({decisions}) {

    const handleOkay=async ()=>{
        let docRef=doc(db,"changeRequests",)
    }

    return (
        <>
            {decisions.decisionMade==="yes"?(
                <div className="decision">
                <p>The request to change from <strong>{decisions.alreadyEnrolled.split("_")[0]}</strong> to <strong>{decisions.newElective.split("_")[0]}</strong> {decisions.isApproved==="yes"?"has been approved.":decisions.isApproved==="no"?"has been rejected.":null}</p>
                <button className="ok-btn" onClick={handleOkay}>Okay</button>
                </div>
            ):(<p>Decisions are yet to be received!</p>)}
        </>
    )
}

export default ChangeElectiveDecisions

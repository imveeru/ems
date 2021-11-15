import React from 'react'

function ChangeElectiveRequests({request}) {

    const handleApprove=()=>{

    }

    const handleReject=()=>{
        
    }

    return (
        <div className="request">
            <p><strong>{request.sender}</strong> has requested you to change his/her elective from <strong>{request.alreadyEnrolled.split("_")[0]}</strong> to <strong>{request.newElective.split("_")[0]}</strong></p>
            <button className="add-btn" onClick={handleApprove}>Approve</button>
            <button className="reject-btn" onClick={handleReject}>Reject</button>
        </div>
    )
}

export default ChangeElectiveRequests

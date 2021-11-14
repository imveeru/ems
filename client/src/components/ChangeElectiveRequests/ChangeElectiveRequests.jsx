import React from 'react'

function ChangeElectiveRequests({request}) {
    return (
        <div className="request">
            <p><strong>{request.sender}</strong> has requested you to change his/her elective from <strong>{request.alreadyEnrolled.split("_")[0]}</strong> to <strong>{request.newElective.split("_")[0]}</strong></p>
            <button className="add-btn">Approve</button>
            <button className="add-btn">Approve</button>
        </div>
    )
}

export default ChangeElectiveRequests

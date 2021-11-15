import React from 'react'

function ChangeElectiveDecisions({decisions}) {
    return (
        <>
            {decisions.decisionMade==="yes"?(
                <div className="decision">
                <p>The request to change from <strong>{decisions.alreadyEnrolled.split("_")[0]}</strong> to <strong>{decisions.newElective.split("_")[0]}</strong> {decisions.isApproved==="yes"?"has been approved.":decisions.isApproved==="no"?"has been rejected.":null}</p>
                <button className="ok-btn">Okay</button>
                </div>
            ):(<p>Decisions are yet to be received!</p>)}
        </>
    )
}

export default ChangeElectiveDecisions

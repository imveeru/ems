import React from 'react'
import './ChangeElective.css'

function ChangeElective({alreadyEnrolledCourses}) {
    return (
        <div className='change-elective-container'>
            <h2>Change Elective<span className='title-tooltip'> Select the course you wish to change and send request to the respective handling faculty.</span></h2>
            <p>Enrolled Courses : 
            <div className='user-details'>
                {alreadyEnrolledCourses.map((course, index) =>(
                    <p>{course}</p>
                ))}
            </div>
            </p>
        </div>
    )
}

export default ChangeElective

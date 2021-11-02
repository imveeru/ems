import React from 'react'

function Faculty({userData}) {
    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!</h1>
                <div className="user-details">
                    <p>{userData.dept}</p>
                    <p>{userData.grade}</p>
                </div>
                <div className="course-assigned">

                </div>
            </div>
    )
}

export default Faculty

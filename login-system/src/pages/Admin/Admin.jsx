import React from 'react'

function Admin({userData}) {
    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!</h1>
                <div className="user-details">
                </div>
            </div>
    )
}

export default Admin

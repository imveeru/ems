import React from 'react'
import {GrNotes,GrUserAdd,GrCompliance} from 'react-icons/gr'

import './Admin.css'

function Admin({userData}) {
    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!</h1>
                <div className="admin-functions">
                    <button className="btn-add">
                        <GrUserAdd/>
                        Add User
                    </button>

                    <button className="btn-add">
                        <GrNotes/>
                        Add Course
                    </button>
                    
                    <button className="btn-add">
                        <GrCompliance/>
                        Assign Course
                    </button>
                </div>
            </div>
    )
}

export default Admin

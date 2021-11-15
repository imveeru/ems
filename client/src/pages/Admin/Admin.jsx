import React,{useState} from 'react'
import {IoPersonAdd,IoNewspaper,IoEnter,IoCalendar} from 'react-icons/io5'
import AddCourse from '../../components/AdminForms/AddCourse'
import AddUser from '../../components/AdminForms/AddUser'
import AssignCourse from '../../components/AdminForms/AssignCourse'

import './Admin.css'

function Admin({userData}) {

    const[form,setForm]=useState("");

    return (
            <div className="home-container">
                <h1>Welcome {userData.name}!</h1>
                <div className="admin-functions">
                    <button className="btn-add" onClick={()=>setForm("au")}>
                        <IoPersonAdd className='btn-icon' style={{"marginRight":"10px"}}/>
                        Add User
                    </button>

                    <button className="btn-add" onClick={()=>setForm("ac")}>
                        <IoNewspaper style={{"marginRight":"10px"}}/>
                        Add Course
                    </button>

                    <button className="btn-add" onClick={()=>setForm("as")}>
                        <IoEnter style={{"marginRight":"10px"}}/>
                          Assign Course
                    </button>

                    <button className="btn-add" onClick={()=>setForm("ad")}>
                        <IoCalendar style={{"marginRight":"10px"}}/>
                          Assign Date
                    </button>
                </div>
                <div className="admin-forms">
                    {form==="au"?<AddUser/>:form==="ac"?<AddCourse/>:form==="as"?<AssignCourse/>:<p>Choose an action!</p>}
                </div>
            </div>
    )
}

export default Admin

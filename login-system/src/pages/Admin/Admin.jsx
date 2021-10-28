import React,{useState} from 'react'
import {GrNotes,GrUserAdd,GrCompliance} from 'react-icons/gr'
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
                        <GrUserAdd className='btn-icon' style={{"marginRight":"10px"}}/>
                        Add User
                    </button>

                    <button className="btn-add" onClick={()=>setForm("ac")}>
                        <GrNotes style={{"marginRight":"10px"}}/>
                        Add Course
                    </button>

                    <button className="btn-add" onClick={()=>setForm("as")}>
                        <GrCompliance style={{"marginRight":"10px"}}/>
                          Assign Course
                    </button>
                </div>
                <div className="admin-forms">
                    {form==="au"?<AddUser/>:form==="ac"?<AddCourse/>:form==="as"?<AssignCourse/>:null}
                </div>
            </div>
    )
}

export default Admin

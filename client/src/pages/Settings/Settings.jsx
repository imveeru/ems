import React,{useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'
import {db} from '../../firebase'
import {MdOutlineArrowBackIos} from 'react-icons/md'

function Settings() {
    return (
        <div>
            <Header/>
            <div className="back-btn">
                    <MdOutlineArrowBackIos/>
                    <Link to="/" style={{'textDecoration':'none','color': 'black'}}><h3>Back</h3></Link>
            </div>
            
        </div>
    )
}

export default Settings

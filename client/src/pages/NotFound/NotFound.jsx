import React from 'react'
import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'
import {MdOutlineArrowBackIos} from 'react-icons/md'

function NotFound() {
    return (
        <div>
            <Header/>
            <div className="back-btn">
                    <MdOutlineArrowBackIos/>
                    <Link to="/" style={{'textDecoration':'none','color': 'black'}}><h3>Back</h3></Link>
            </div>
            <div className="settings-container">
            <h1>😢Oops! Page Not found</h1>
            </div>
        </div>
    )
}

export default NotFound

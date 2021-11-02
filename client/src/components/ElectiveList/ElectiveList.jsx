import React from 'react'
import './ElectiveList.css'
import {Link} from 'react-router-dom'

function ElectiveList({electives}) {
    return (
        <div className="previous-electives-container">
        <h2 className="previous-electives-title">Electives of All Semesters<span className='title-tooltip'> Click on any course to view about it.</span></h2>
        <div className="previous-electives-list">
                {electives.map((elective) =>(
                        <div key={elective.sem} className="previous-elective">
                            <div className="sem-name">Semester - {elective.sem}</div>
                            <div className="sem-list">
                                <Link to={elective.elective_1===null?"#":"/course/"+elective.elective_1} style={{'textDecoration':'none','color':'black'}}><p className='elective'>Elective 1 - {elective.elective_1===null?"No Elective":elective.elective_1}</p></Link>
                                <Link to={elective.elective_2===null?"#":"/course/"+elective.elective_2} style={{'textDecoration':'none','color':'black'}}><p className='elective'>Elective 2 - {elective.elective_2===null?"No Elective":elective.elective_2}</p></Link>
                                <Link to={elective.elective_3===null?"#":"/course/"+elective.elective_3} style={{'textDecoration':'none','color':'black'}}><p className='elective'>Elective 3 - {elective.elective_3===null?"No Elective":elective.elective_3}</p></Link>
                            </div>
                        </div> 
                ))}
        </div>
        </div>
    )
}

export default ElectiveList

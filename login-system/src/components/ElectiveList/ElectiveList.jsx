import React from 'react'
import './ElectiveList.css'

function ElectiveList({electives}) {
    return (
        <div className="previous-electives-container">
        <h2 className="previous-electives-title">Electives of All Semesters<span className='title-tooltip'> Click on any course to view about it.</span></h2>
        <div className="previous-electives-list">
                {electives.map((elective) =>(
                        <div key={elective.sem} className="previous-elective">
                            <div className="sem-name">Semester - {elective.sem}</div>
                            <div className="sem-list">
                                <p className='elective' href={elective.elective_1===null?"#":"/"+elective.elective_1}>Elective 1 - {elective.elective_1===null?"No Elective":elective.elective_1}</p>
                                <p className='elective'>Elective 2 - {elective.elective_2===null?"No Elective":elective.elective_2}</p>
                                <p className='elective'>Elective 3 - {elective.elective_3===null?"No Elective":elective.elective_3}</p>
                            </div>
                        </div> 
                ))}
        </div>
        </div>
    )
}

export default ElectiveList

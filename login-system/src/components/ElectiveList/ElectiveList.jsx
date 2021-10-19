import React from 'react'

function ElectiveList({electives}) {
    return (
        <div className="previous-electives-container">
            <h2>Electives of Previous Semesters</h2>
                {electives.map((elective) =>(
                        <div key={elective.sem} className="previous-elective">
                            <div className="sem-name">Semester - {elective.sem}</div>
                            <div className="sem-list">
                                <p>Elective 1 - {elective.elective_1===null?"No Elective":elective.elective_1}</p>
                                <p>Elective 2 - {elective.elective_2===null?"No Elective":elective.elective_2}</p>
                                <p>Elective 3 - {elective.elective_3===null?"No Elective":elective.elective_3}</p>
                            </div>
                        </div> 
                ))}
        </div>
    )
}

export default ElectiveList

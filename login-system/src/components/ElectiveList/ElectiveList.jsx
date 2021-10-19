import React from 'react'

function ElectiveList({electives}) {
    return (
        <div>
            {
                electives.map((elective) =>(
                    <p>{elective.sem}-{elective.elective_1}-{elective.elective_2}-{elective.elective_3}</p>
                ))
            }
        </div>
    )
}

export default ElectiveList

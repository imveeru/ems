import React,{useState} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { useForm } from "react-hook-form";

function AssignDate() {

    const{ register, handleSubmit } = useForm();

    const[startDate,setStartDate]=useState(new Date())
    const[endDate,setEndDate]=useState(new Date())

    const handleSelectStartDate=(date)=>{
        setStartDate(date)
        console.log('Start date: ',date)
    }

    const handleSelectEndDate=(date)=>{
        setEndDate(date)
        console.log('End date: ',date)
    }

    cons

    return (
        <div>
            <h2>Assign Date</h2>
            <div className="calendars">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="calendar">
                        <p>Start Date</p> 
                        <Calendar
                            date={startDate}
                            onChange={handleSelectStartDate}
                        />
                    </div>

                    <div className="calendar">
                        <p>End Date</p> 
                        <Calendar
                            date={endDate}
                            onChange={handleSelectEndDate}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AssignDate

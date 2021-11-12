import React,{ useState,useEffect} from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import ElectiveList from '../../components/ElectiveList/ElectiveList'
import AssignedElective from './../../components/Assigned Course/AssignedElective';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'

function Student({userData}) {

    const [electives,setElectives]=useState([]);

    const [assignedCourses,setAssignedCourses]= useState([])

    const {currentUser}=useAuth()

    const {handleSubmit}=useForm()

    const assignedCourseQuery = query(collection(db, "electives"), where("batch", "==", String(userData.yearJoined)), where("dept", "==", String(userData.branch)), where("sem", "==", String(userData.currentSem)));

    const fetchUserData=async()=>{
        //const q=query(collection(db,`users/${currentUser.uid}/electives`),orderBy('sem','asc'))
        var electiveList=[]
        db.collection( `users/${currentUser.uid}/electives`).orderBy('sem','asc')
        .onSnapshot((snapDoc)=>{
            electiveList.splice(0,electiveList.length)
            snapDoc.forEach((doc)=>{electiveList.push(doc.data())})
        })
        setElectives(electiveList)

        // fetch elective choices
        const assignedCourse = [];
        onSnapshot(assignedCourseQuery, (querySnapshot) => {
            assignedCourse.splice(0,assignedCourse.length)
            querySnapshot.forEach((doc) => {
                assignedCourse.push(doc.data());
            })
        })
        //console.log(assignedCourse);
        setAssignedCourses(assignedCourse);
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          padding: 20,
        }),
      }

    useEffect(()=>{
        fetchUserData()
    },[])

    const options =[];

    assignedCourses.map((assignedCourse) => {
        options.push({"value":assignedCourse.courseCode,"label":assignedCourse.courseCode})
    })

    const maxNoOfElectives=2

    const [selectedOption, setSelectedOption] = useState(null);

    const [chosenElectives, setChosenElectives] = useState([])

    //console.log(electives); 

    const handleEnroll=(formData, event)=>{
        if(selectedOption==null || selectedOption.length<maxNoOfElectives){
            toast.error("Choose your electives before enrolling!");
        }else if(selectedOption!=null && selectedOption.length===maxNoOfElectives){
            var chosenElectivesList=[]
            selectedOption.forEach(option=>{
                chosenElectivesList.push(option.value)
            })
            setChosenElectives(chosenElectivesList);
            chosenElectivesList.forEach(elective => {
                console.log(elective);
            })
            toast.success("Enrolled successfully!🥳");
        }
    }

    return (
            <div className="home-container">
                <Toaster/>
                <h1>Welcome {userData.name}!<span className="user-regno">   [{userData.regNo}]</span></h1>
                <div className="user-details">
                    <p>{userData.program} {userData.branch}</p>
                    <p>{userData.yearJoined} Batch</p>
                    <p>{userData.section} - Section</p>
                    <p>Semester - {userData.currentSem}</p>
                </div>
                <ElectiveList electives={electives}/>
                <div className="elective-choices-container">
                    <h2>Elective courses for Semester {userData.currentSem}<span className='title-tooltip'> Click on any course code to view about it.</span></h2>
                    <form onSubmit={handleSubmit(handleEnroll)}>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={(selectedOption==null || selectedOption.length<maxNoOfElectives)?options:[]}
                        noOptionsMessage={() => {
                            return (selectedOption==null || selectedOption.length<maxNoOfElectives)?"":`🤐You're limited to choose only ${maxNoOfElectives} courses!`;
                        }}
                        placeholder="Select required elective courses here..."
                        isMulti
                        styles={customStyles}
                        closeMenuOnSelect={false}
                    />
                    <button type="submit" className="add-btn enroll-btn">Enroll</button>
                    </form>
                    
                    <div className="elective-choices">
                    <AssignedElective assignedCourses={assignedCourses}/>
                    </div>
                </div>
                {/* {electives.length!==0?<p>{electives[0][4].elective_2}</p>:<p>Illa</p>} */}
            </div>
    )
}

export default Student

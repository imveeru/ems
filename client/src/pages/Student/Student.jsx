import React,{ useState,useEffect} from 'react'
import { collection, query, where, onSnapshot,updateDoc, arrayUnion,doc } from "firebase/firestore";
import {db} from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import ElectiveList from '../../components/ElectiveList/ElectiveList'
import AssignedElective from './../../components/Assigned Course/AssignedElective';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import ChangeElective from './../../components/ChangeElective/ChangeElective';

function Student({userData}) {

    const [electives,setElectives]=useState([]);

    const [assignedCourses,setAssignedCourses]= useState([])

    const [alreadyEnrolledCourses,setAlreadyEnrolledCourses]=useState([])

    const [changeRequests,setChangeRequests]=useState([])

    const {currentUser}=useAuth()

    const {handleSubmit}=useForm()

    const assignedCourseQuery = query(collection(db, "electives"), where("batch", "==", String(userData.yearJoined)), where("dept", "==", String(userData.branch)), where("sem", "==", String(userData.currentSem)));

    const alreadyEnrolledCourseQuery = query(collection(db, "electives"), where("studentList","array-contains",userData.regNo), where("batch", "==", String(userData.yearJoined)), where("dept", "==", String(userData.branch)), where("sem", "==", String(userData.currentSem)));

    const fetchRequestsQuery = query(collection(db, "changeRequests"), where("sender","==",userData.regNo))

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
        setAssignedCourses(assignedCourse);

        // already registered status
        const alreadyEnrolledCourseList = [];
        onSnapshot(alreadyEnrolledCourseQuery, (querySnapshot) => {
            alreadyEnrolledCourseList.splice(0,alreadyEnrolledCourseList.length)
            querySnapshot.forEach((doc) => {
                alreadyEnrolledCourseList.push(doc.data().courseCode);
            })
        })
        setAlreadyEnrolledCourses(alreadyEnrolledCourseList);
        //console.log(alreadyEnrolledCourseList);
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          padding: 20,
        }),
    }
    
    const fetchRequests=async()=>{
        const requestList = [];
        onSnapshot(fetchRequestsQuery, (querySnapshot) => {
            requestList.splice(0,requestList.length)
            querySnapshot.forEach((doc) => {
                requestList.push(doc.data());
            })
        })
        setChangeRequests(requestList);
    }

    useEffect(()=>{
        fetchUserData()
        fetchRequests()
    },[])

    const options =[];

    //options input
    assignedCourses.forEach((assignedCourse) => {
        options.push({"value":assignedCourse.courseCode,"label":assignedCourse.courseCode})
    })

    //filtering already registered courses    
        for(var i=0;i<alreadyEnrolledCourses.length;i++){
            //options.value.indexOf(alreadyEnrolledCourses[i])
            for(var j=0;j<options.length;j++){
                if(options[j].value===alreadyEnrolledCourses[i]){
                    options.splice(j,1)
                }   
            }
        }


    //return option.value!==alreadyEnrolledCourses[0]

    const maxNoOfElectives=2

    const noOfAlreadyEnrolledCourses = alreadyEnrolledCourses.length;

    const [selectedOption, setSelectedOption] = useState(null);

    const [chosenElectives, setChosenElectives] = useState([])

    const handleEnroll=()=>{
        if(selectedOption==null || selectedOption.length<=0){
            toast.error("Choose your electives before enrolling!");
        }else if(selectedOption!=null && ((selectedOption.length===maxNoOfElectives) || selectedOption.length<=(maxNoOfElectives-noOfAlreadyEnrolledCourses))){
            //set chose electives
            var chosenElectivesList=[]
            selectedOption.forEach(option=>{
                chosenElectivesList.push(option.value)
            })
            setChosenElectives(chosenElectivesList);

            // add student roll num in elective doc.
            chosenElectivesList.forEach(async elective => {
                let electiveCode=elective+"_"+userData.yearJoined+"_"+userData.currentSem+"_"+userData.branch
                // console.log(electiveCode);
                let electiveRef=doc(db,"electives",electiveCode)
                await updateDoc(electiveRef, {
                    studentList: arrayUnion(userData.regNo)
                });
                
            })

            toast.success("Enrolled successfully!🥳");

            //console.log(options);
        }else{
            toast.error("Unexpected error occured! Contact Administration Team.")
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
                        options={(selectedOption==null || selectedOption.length<(maxNoOfElectives-noOfAlreadyEnrolledCourses))?options:[]}
                        noOptionsMessage={() => {
                            return (selectedOption==null || selectedOption.length<(maxNoOfElectives-noOfAlreadyEnrolledCourses))?"":`🤐You're limited to choose only ${(maxNoOfElectives)} elective courses!`;
                        }}
                        placeholder="Select required elective courses here..."
                        isMulti
                        styles={customStyles}
                        closeMenuOnSelect={false}
                        isDisabled={maxNoOfElectives===alreadyEnrolledCourses.length?true:false}
                    />
                    <button type="submit" className="add-btn enroll-btn">Enroll</button>
                    </form>

                    <div className="elective-choices">
                    <AssignedElective assignedCourses={assignedCourses}/>
                    </div>
                </div>
                
                {/* <p>{JSON.stringify(options)+"   -|-   "+JSON.stringify(alreadyEnrolledCourses)}</p> */}
                {/* {electives.length!==0?<p>{electives[0][4].elective_2}</p>:<p>Illa</p>} */}
                {alreadyEnrolledCourses.length>0&&(
                    <ChangeElective alreadyEnrolledCourses={alreadyEnrolledCourses} userData={userData} assignedCourses={assignedCourses}/>
                )}


            </div>
    )
}

export default Student

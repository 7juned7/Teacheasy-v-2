import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'

import StudentsBadge from './StudentsBadge'
import StudentDataContext from '../Context/StudentDataContext';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,


} from '@chakra-ui/react'

import "./styles/allStudents.css"
import UserContext from '../Context/UserContext';

const Allstudents = () => {
    const { sort, setSort } = useContext(StudentDataContext);
    const { flag, setFlag } = useContext(UserContext);
    const { data } = useContext(StudentDataContext);

    const sortby = (e) => {

        if (e.target.innerHTML === "A-Z") {

            setSort("A-Z");
        }
        else {
            setSort("by rollno");
        }


    }
    const handleShowStudents = () => {
        setFlag(false)


    }


    return (

        <>
            <div className={flag ? ("allStudents ") : ("allStudents display")}  >
                <div className="cross" onClick={handleShowStudents}>
                    <svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#000000">

                            <rect x="11" y="2" width="3" height="21" />

                            <rect x="2" y="11" width="21" height="3" />
                        </g>
                    </svg>
                </div>
                {data ? (<><div className='filter-section'>

                    <h2>All Students</h2>


                    <div className="dropdown">
                        <button className="dropdown-button">{sort}</button>
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={(e) => sortby(e)}>A-Z</div>
                            <div className="dropdown-item" onClick={(e) => sortby(e)}>by rollno</div>
                        </div>
                    </div>

                </div></>) : ("no data")}
                <div className='studentList'>

                    {
                        data ? (
                            data.map((data) => {
                                return (
                                    <div key={data._id} >
                                        <StudentsBadge
                                            data={data}
                                            name={data.studentName}
                                            rollno={data.studentRollno}
                                            English={data.studentMarks.English}
                                            Science={data.studentMarks.Science}
                                            Maths={data.studentMarks.Maths}
                                        />
                                    </div>
                                )
                            })
                        ) : ("")
                    }


                </div>




            </div >
        </>
    )
}

export default Allstudents;
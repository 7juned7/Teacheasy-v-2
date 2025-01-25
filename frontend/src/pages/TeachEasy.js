import { Box } from '@chakra-ui/react';
import React, { useContext } from 'react'
import Allstudents from '../components/Allstudents';
// import Allstudents from '../components/Allstudents';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import NavigationPannel from '../components/NavigationPannel';

import SideDrawer from '../components/SideDrawer';
import StudentsDetails from '../components/StudentsDetails';
// import StudentsDetails from '../components/StudentsDetails';

import "../components/styles/allStudents.css"
import StudentDataContext from '../Context/StudentDataContext';


const TeachEasy = () => {

    const { data } = useContext(StudentDataContext);
    return (
        <Box


            bg={"#402E7A"}

        >


            <div><Navbar /></div>
            <div className='overlay' ></div>
            <Box >

                <Box display={"flex"}
                    justifyContent={"space-between"}>
                    <Dashboard />

                    <Allstudents />

                    {/* <StudentsDetails /> */}
                </Box>
            </Box>
            <NavigationPannel />
        </Box>

    )
}

export default TeachEasy;
import { Avatar, Box, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import StudentDataContext from '../Context/StudentDataContext'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,

    useDisclosure,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

import "./styles/allStudents.css"
import UserContext from '../Context/UserContext'

const StudentsBadge = (user) => {
    const { flag, setFlag } = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("");
    const [englishNo, setEnglishNo] = useState("");
    const [mathNo, setMathNo] = useState("");
    const [scienceNo, setScienceNo] = useState("");


    const { count, setCount } = useContext(StudentDataContext);
    const { selectedStudent, setSelectedStudent } = useContext(StudentDataContext);
    console.log("hello")


    const handleClick = () => {

        setSelectedStudent(user.data)
        setFlag(false)
    }
    const userId = localStorage.getItem("userId");
    const studentRollno = user.rollno;

    const handleDelete = async () => {

        try {
            const config = {

                headers: {
                    'Content-type': "application/json",

                },

            };
            await axios.post("/api/studentdata/delete", { userId, studentRollno }, config)
            setCount(count - 1)

        } catch (error) {
            console.log("error in deleting")
        }
    }
    const handleEdit = () => {

        setEnglishNo(user.English);
        setMathNo(user.Maths);
        setScienceNo(user.Science);
        setName(user.name)


    }

    const handlefunction = async () => {
        if (user.rollno) {
            try {
                const config = {

                    headers: {
                        'Content-type': "application/json",

                    },

                };
                const { data } = await axios.post("/api/studentdata/update", { userId, studentName: name, studentRollno: user.rollno, studentMarks: { English: englishNo, Maths: mathNo, Science: scienceNo } }, config)
                console.log(data);
                setCount(count + 1);


            } catch (error) {
                console.log("error in saving student");
            }
        }


    }






    return (

        < Box

            display={"flex"}

            alignItems={"center"}

            width={"100%"}
            justifyContent={"space-between"}
            bg={"#F5EFFF"}
            p={1}


            borderRadius={"lg"}
            margin={1}
            cursor={"pointer"}






        >



            <Box display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleClick}
                p={1}>

                <Avatar
                    mr={2}
                    size="sm"
                    cursor={"pointer"}
                    name={user.name}

                />
                <Box display={"flex"}
                    gap={10}
                    m={4} >
                    <Text>{user.name}</Text>
                    <Text>{user.rollno}</Text>
                </Box>
            </Box>
            <Box display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                gap={5}
            >

                <Button colorScheme='red' onClick={handleDelete}>
                    Delete
                </Button>
                <Box onClick={handleEdit}>
                    <Button colorScheme='blue' onClick={onOpen}>
                        edit
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='left'
                        onClose={onClose}

                    >
                        <DrawerOverlay />
                        <DrawerContent
                            bg={"#a294f9"}
                            color={"white"}
                        >
                            <DrawerCloseButton />
                            <DrawerHeader>Edit Student</DrawerHeader>

                            <DrawerBody>
                                <FormControl >
                                    <FormLabel>Student Name</FormLabel>
                                    <Input type='name'
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                    <FormLabel>Student Rollno</FormLabel>
                                    <Input type='number'
                                        value={user.rollno}

                                    />

                                </FormControl>
                                <FormControl >
                                    <FormLabel>Student Marks</FormLabel>
                                    <FormControl >
                                        <FormLabel>English</FormLabel>
                                        <Input type='number'
                                            value={englishNo}
                                            onChange={(e) => { setEnglishNo(e.target.value) }}
                                            required
                                        />
                                        <FormLabel>Math</FormLabel>
                                        <Input type='name'
                                            value={mathNo}
                                            onChange={(e) => { setMathNo(e.target.value) }}
                                            required
                                        />
                                        <FormLabel>Science</FormLabel>
                                        <Input type='name'
                                            value={scienceNo}
                                            onChange={(e) => { setScienceNo(e.target.value) }}
                                            required
                                        />

                                    </FormControl>


                                </FormControl>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handlefunction} colorScheme='blue'>Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Box>
            </Box>



        </ Box>


    )
}

export default StudentsBadge;
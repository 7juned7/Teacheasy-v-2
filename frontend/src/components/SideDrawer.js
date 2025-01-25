import React, { useContext, useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import axios from 'axios';
import StudentDataContext from '../Context/StudentDataContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const SideDrawer = () => {
    const { count, setCount } = useContext(StudentDataContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("");
    const [englishNo, setEnglishNo] = useState("");
    const [mathNo, setMathNo] = useState("");
    const [scienceNo, setScienceNo] = useState("");
    const [rollno, setRollno] = useState("");
    const userId = localStorage.getItem("userId");


    const handlefunction = async () => {
        if (!rollno) {
            console.log("Roll number is required.");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/studentdata/add",
                {
                    userId,
                    studentName: name,
                    studentRollno: rollno,
                    studentMarks: {
                        English: englishNo,
                        Maths: mathNo,
                        Science: scienceNo,
                    },
                },
                config
            );

            console.log("Student data saved successfully:", data);


            setCount(count + 1);
            defaultState();
        } catch (error) {
            console.error("Error saving student:", error.message);

            alert("Failed to save student data. Please try again.");
        }



    }

    const defaultState = () => {
        setName("");
        setRollno("");
        setEnglishNo("");
        setMathNo("");
        setScienceNo("");


    }





    return (<>
        <Button onClick={onOpen}
            background={"opacity"}
            border={"none"}
            _hover={{ background: "opacity" }}
            _active={{ background: "opacity" }}
        >
            <PersonAddIcon />
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
                <DrawerHeader>Add Student</DrawerHeader>

                <DrawerBody

                >
                    <FormControl >
                        <FormLabel>Student Name</FormLabel>
                        <Input type='name'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <FormLabel>Student Rollno</FormLabel>
                        <Input type='number'
                            value={rollno}
                            onChange={(e) => { setRollno(e.target.value) }}
                        />

                    </FormControl>
                    <FormControl >
                        <FormLabel>Student Marks</FormLabel>
                        <FormControl >
                            <FormLabel>English</FormLabel>
                            <Input type='number'
                                value={englishNo}
                                onChange={(e) => { setEnglishNo(e.target.value) }}
                            />
                            <FormLabel>Math</FormLabel>
                            <Input type='name'
                                value={mathNo}
                                onChange={(e) => { setMathNo(e.target.value) }}
                            />
                            <FormLabel>Science</FormLabel>
                            <Input type='name'
                                value={scienceNo}
                                onChange={(e) => { setScienceNo(e.target.value) }}
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
    </>
    )
}

export default SideDrawer;
import React from 'react'
import { useState } from 'react'
import { Button, Container, FormControl, FormHelperText, FormLabel, Input, VStack, Text } from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    let Navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isemailempty = email === '';

    const ispasswordempty = password === '';

    const handleSignup = async () => {
        console.log("hello")
        try {
            const config = {

                headers: {
                    'Content-type': "application/json",

                },

            };
            const { data } = await axios.post("/api/user/login", { email, password }, config)
            let userId = data._id;
            let userName = data.name;
            console.log(data)
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName)
            Navigate("/teacheasy");
        } catch (error) {
            console.log("error")
        }

    }
    return (
        <Container>
            <VStack>

                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input type='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    {
                        !isemailempty ? ("") : (<FormHelperText>
                            Please Enter Your Email
                        </FormHelperText>)
                    }

                </FormControl>
                <FormControl >
                    <FormLabel>Password</FormLabel>
                    <Input type='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    {
                        !ispasswordempty ? ("") : (<FormHelperText>
                            Please enter your password*
                        </FormHelperText>)
                    }

                </FormControl>
                <Button onClick={handleSignup}>Sign Up</Button>
                <Text mt={2} >default id & password : admin:admin</Text>
            </VStack>
        </Container>
    )
}

export default Signup;
import React from 'react'
import Login from '../components/Login';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Signup from '../components/Signup';

const Homepage = () => {
    return (
        <Container maxW={"xl"} centerContent>
            <Box>
                <Text>TeachEasy</Text>
            </Box>
            <Box
                width={"100%"}>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Sign up</Tab>
                        <Tab>Login</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {<Login />}
                        </TabPanel>
                        <TabPanel>
                            {<Signup />}
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>
        </Container>
    )
}

export default Homepage;
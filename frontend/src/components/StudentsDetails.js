import { Avatar, Box, Text } from '@chakra-ui/react'
import { useContext } from 'react';



import StudentDataContext from '../Context/StudentDataContext'
import { Chart as ChartJS, DoughnutController } from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2';

const StudentsDetails = () => {
    const { particulardata } = useContext(StudentDataContext);
    console.log(particulardata);



    return (<Box
        width={"100%"}
        color={"white"}
        fontFamily={"sans-serif"}
    >
        {!particulardata ? (
            <div>Hi</div>
        ) : (<Box width={"100%"}

            overflow={"hidden"}
            height={"100%"}>
            <Box
                borderRadius={"lg"}
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                p={"4"}>
                <Box
                >
                    <Text>Name:{particulardata.name}</Text>
                    <Text>Rollno:{particulardata.rollno}</Text>
                </Box>
                <Box>
                    <Avatar
                        mr={2}
                        size="md"
                        cursor={"pointer"}
                        name={particulardata.name}
                    />
                </Box>
            </Box>
            <Box>


                <Box display={"flex"}
                    justifyContent={"space-around"}>
                    <Text>Maths</Text>
                    <Text>{particulardata.Maths}</Text>

                </Box>
                <Box display={"flex"}
                    justifyContent={"space-around"}>
                    <Text>English</Text>
                    <Text>{particulardata.English}</Text>
                    {/*  */}
                </Box>
                <Box display={"flex"}
                    justifyContent={"space-around"}>
                    <Text>Science</Text>
                    <Text>{particulardata.Science}</Text>

                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                    gap={"2rem"}
                    width={"400px"}
                    height={"200px"}

                    margin={" 2rem auto"}>
                    <Bar
                        data={{

                            labels: ["English", "Maths", "Science"],

                            datasets: [
                                {
                                    label: "Total Marks",
                                    data: [100, 100, 100],
                                    backgroundColor: ["#3DC2EC"]
                                },
                                {
                                    label: "Marks",
                                    data: [particulardata.Science, particulardata.Maths, particulardata.English],
                                    backgroundColor: ["lightGreen"]
                                },


                            ],
                        }
                        }


                    />
                    <Doughnut

                        data={{

                            labels: ["Science", "Maths", "English"],

                            datasets: [
                                {

                                    data: [particulardata.Science, particulardata.Maths, particulardata.English],
                                    backgroundColor: ["red", "lightGreen", "skyblue"]
                                },



                            ],
                        }
                        }


                    />

                </Box>



            </Box>

        </Box>)}


    </Box>

    )
}

export default StudentsDetails;
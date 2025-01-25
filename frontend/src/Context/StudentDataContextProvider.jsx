import React, { useEffect, useState } from 'react';
import axios from "axios";
import StudentDataContext from './StudentDataContext';

const StudentDataContextProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [particulardata, setParticulardata] = useState([]);
    const userId = localStorage.getItem("userId");
    const [sort, setSort] = useState("A-Z");
    const [dataFlag, setDataFlag] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
        if (userId) {
            try {
                const config = {
                    headers: {
                        'Content-type': "application/json",
                    },
                };

                const response = await axios.post("/api/studentdata/data", { userId, sort }, config);

                setData(response.data);
                console.log("Fetched Data:", response.data);

                setDataFlag(true);

                // Set the first student as the default selected
                if (response.data.length > 0) {
                    setSelectedStudent(response.data[0]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [count, sort, userId]);

    return (
        <StudentDataContext.Provider
            value={{
                data,
                setData,
                particulardata,
                setParticulardata,
                count,
                setCount,
                sort,
                setSort,
                dataFlag,
                selectedStudent,
                setSelectedStudent,
            }}
        >
            {children}
        </StudentDataContext.Provider>
    );
};

export default StudentDataContextProvider;

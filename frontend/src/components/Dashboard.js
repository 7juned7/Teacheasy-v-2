import React, { useContext } from 'react';
import "./styles/DashBoard.css";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import StudentDataContext from '../Context/StudentDataContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dashboard = () => {
    const { data, selectedStudent, setSelectedStudent } = useContext(StudentDataContext);

    // Ensure data is sorted
    const sortedData = data?.sort((a, b) => a.studentRollno - b.studentRollno) || [];

    // Generate chart labels and datasets
    const rollNumbers = sortedData.map((student) => `${student.studentRollno}`);
    const englishMarks = sortedData.map((student) => student.studentMarks?.English || 0);
    const mathsMarks = sortedData.map((student) => student.studentMarks?.Maths || 0);
    const scienceMarks = sortedData.map((student) => student.studentMarks?.Science || 0);

    // Chart configurations
    const createBarChartData = (label, data, color) => ({
        labels: rollNumbers,
        datasets: [
            {
                label,
                data,
                backgroundColor: color[0],
                borderColor: color[1],
                borderWidth: 1,
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 20,
                    padding: 5,
                    usePointStyle: true,
                },
            },
            tooltip: { mode: "index", intersect: false },
        },
        scales: {
            x: { title: { display: true, text: "Roll Numbers" } },
            y: { beginAtZero: true, title: { display: true, text: "Marks" } },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                const clickedStudent = sortedData[clickedIndex];
                setSelectedStudent(clickedStudent);
            }
        },
        onHover: (event, elements) => {
            const target = event.native.target;
            if (elements.length) {
                target.style.cursor = 'pointer'; // Show pointer cursor when hovering over data
            } else {
                target.style.cursor = 'default'; // Default cursor when not hovering
            }
        },
    };

    const createPieChartData = (marks, subject) => ({
        labels: [`${subject} Marks Scored`, "Remaining"],
        datasets: [
            {
                data: [marks, 100 - marks],
                backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.3)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    });

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 10,
                    padding: 5,
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} marks`,
                },
            },
            datalabels: {
                color: '#000', // Text color
                font: {
                    size: 12, // Text size
                    weight: 'bold',
                },
                formatter: (value) => value, // Show the raw value (number)
                anchor: 'end',
                align: 'start',
            },
        },
        onHover: (event, elements) => {
            const target = event.native.target;
            if (elements.length) {
                target.style.cursor = 'pointer'; // Show pointer cursor when hovering over data
            } else {
                target.style.cursor = 'default'; // Default cursor when not hovering
            }
        },
    };




    return (
        <div className="dashboardContainer">
            {data.length > 0 ? (
                <>
                    <div className="student-details">
                        <div className="student-text">{`Name: ${selectedStudent.studentName}`}</div>
                        <div className="student-text">{`Roll No: ${selectedStudent.studentRollno}`}</div>
                    </div>
                    <div className="graphs">
                        {/* Pie Charts */}
                        <div className="charts">
                            {["English", "Maths", "Science"].map((subject) => (
                                <div className="pieChart" key={subject}>
                                    <Pie
                                        data={createPieChartData(
                                            selectedStudent?.studentMarks?.[subject] || 0,
                                            subject
                                        )}
                                        options={pieChartOptions}
                                        aria-label={`Pie chart for ${subject}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Bar Charts */}
                        <div className="charts">
                            {[
                                ["English", englishMarks, ["rgba(255, 99, 132, 0.6)", "rgba(255, 99, 132, 1)"]],
                                ["Maths", mathsMarks, ["rgba(54, 162, 235, 0.6)", "rgba(54, 162, 235, 1)"]],
                                ["Science", scienceMarks, ["rgba(255, 206, 86, 0.6)", "rgba(255, 206, 86, 1)"]],
                            ].map(([label, marks, colors]) => (
                                <div className="barChart" key={label}>
                                    <Bar
                                        data={createBarChartData(label, marks, colors)}
                                        options={chartOptions}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default Dashboard;

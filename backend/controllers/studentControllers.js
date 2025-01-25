const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");

const studentData = asyncHandler(async (req, res) => {
    const { userId, studentName, studentRollno, studentMarks } = req.body;

    const studentdata = await Student.create({
        userId,
        studentName,

        studentRollno,
        studentMarks
    })
    if (studentdata) {
        res.status(201).json({
            _id: studentdata._id,
            userId: studentdata.userId,
            studentRollno: studentdata.studentRollno,

            studentName: studentdata.studentName,
            studentMarks: studentdata.studentMarks

        });
    }
    else {
        res.status(400);
        throw new Error("Error in receiving student data")
    }
})

const fetchStudentData = asyncHandler(async (req, res) => {
    const { userId, sort } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    let studentData;

    try {

        if (sort === "A-Z") {
            studentData = await Student.find({ userId }).sort({ studentName: 1 });
        } else if (sort === "by rollno") {
            studentData = await Student.find({ userId }).sort({ studentRollno: 1 });
        } else {
            return res.status(400).json({ error: "Invalid sort option." });
        }

        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching student data." });
    }
});



const deleteStudent = asyncHandler(async (req, res) => {
    const { userId, studentRollno } = req.body;
    if (!userId || !studentRollno) {
        res.status(400);
        throw new Error("Please Enter all the Fields")
    }
    const deletedStudent = await Student.findOneAndDelete({ userId: userId, studentRollno: studentRollno })
    res.send(deletedStudent);


})

const update = asyncHandler(async (req, res) => {
    const { userId, studentRollno, studentName, studentMarks } = req.body;

    // if (userId || !studentName || !studentMarks) {
    //     res.status(400);
    //     throw new Error("Please Enter all the Fields")
    // }
    const updateStudent = await Student.findOneAndUpdate({ userId: userId, studentRollno: studentRollno },
        {
            studentName: studentName,
            studentMarks: studentMarks
        })
    res.send(updateStudent);
})


module.exports = { fetchStudentData, studentData, deleteStudent, update }
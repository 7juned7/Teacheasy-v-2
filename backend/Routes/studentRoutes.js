const express = require("express");
const { studentData, fetchStudentData, deleteStudent, update } = require("../controllers/studentControllers");
const router = express.Router();

router.route("/add").post(studentData);
router.route("/delete").post(deleteStudent);
router.route("/data").post(fetchStudentData)
router.route("/update").post(update)

// router.route("/editdata").put(studentData)

module.exports = router;
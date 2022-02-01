const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware")
const courseControllers = require("../controllers/courseControllers")


router.post("/createCourse", userMiddleware.validateUser, courseControllers.createCourse)

router.get("/fetchCourses", userMiddleware.validateUser, courseControllers.fetchCourses)

router.get("/getCourse/:id", userMiddleware.validateUser, courseControllers.getSingleCourse)

router.put("/updateCourse/:id", userMiddleware.validateUser, courseControllers.updateCourse)

router.delete("/deleteCourse/:id", userMiddleware.validateUser, courseControllers.deleteCourse)

router.post("/assignCourse/student", courseControllers.assignCourseStudent)

router.post("/student/courses", courseControllers.studentOptedCourses)

router.post("/assignCourse/teacher", userMiddleware.validateUser, courseControllers.assignCourseTeacher)

router.post("/teacher/courses", userMiddleware.validateUser, courseControllers.teacherAssignedCourses)

module.exports = router
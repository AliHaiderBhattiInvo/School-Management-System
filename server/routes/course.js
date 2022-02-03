const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const courseMiddleware = require("../middlewares/courseMiddleware");
const courseControllers = require("../controllers/courseControllers");

router.get("/fetchCourses", courseControllers.fetchCourses);

router.post(
  "/createCourse",
  userMiddleware.validateAdmin,
  courseMiddleware.validateExistingCourse,
  courseControllers.createCourse
);

router.get(
  "/getCourse/:id",
  userMiddleware.validateAdmin,
  courseMiddleware.validateExistingCourseID,
  courseControllers.getSingleCourse
);

router.put(
  "/updateCourse/:id",
  userMiddleware.validateAdmin,
  courseMiddleware.validateExistingCourseID,
  courseControllers.updateCourse
);

router.delete(
  "/deleteCourse/:id",
  userMiddleware.validateAdmin,
  courseMiddleware.validateExistingCourseID,
  courseControllers.deleteCourse
);

router.post(
  "/assignCourse/student",
  userMiddleware.validateLoginStudent,
  courseMiddleware.validateCourse,
  courseControllers.assignCourseStudent
);

router.post(
  "/student/courses",
  userMiddleware.validateLoginStudent,
  courseControllers.studentOptedCourses
);

router.post(
  "/assignCourse/teacher",
  userMiddleware.validateAdmin,
  userMiddleware.validateTeacher,
  courseMiddleware.validateCourse,
  courseControllers.assignCourseTeacher
);

router.post(
  "/teacher/courses",
  userMiddleware.validateLoginTeacher,
  courseControllers.teacherAssignedCourses
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware")
const courseControllers = require("../controllers/courseControllers")


router.post("/createCourse", userMiddleware.validateUser, courseControllers.createCourse)

router.get("/fetchCourses", userMiddleware.validateUser, courseControllers.fetchCourses)

router.get("/getCourse/:id", userMiddleware.validateUser, courseControllers.getSingleCourse)

router.put("/updateCourse/:id", userMiddleware.validateUser, courseControllers.updateCourse)

router.delete("/deleteCourse/:id", userMiddleware.validateUser, courseControllers.deleteCourse)

module.exports = router
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const userMiddleware = require("../middlewares/userMiddleware")


router.post("/createUser", userMiddleware.validateUser, userControllers.createUser);

router.delete("/deleteUser", userMiddleware.validateUser, userControllers.deleteUser);

router.get("/fetch/students", userMiddleware.validateUser, userControllers.fetchStudents)

router.get("/fetch/teachers", userMiddleware.validateUser, userControllers.fetchTeachers)

router.post("/updateUser/:id", userControllers.updateUser)

module.exports = router;

const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userMiddleware = require("../middlewares/userMiddleware");

const { body } = require("express-validator");

router.post(
  "/createUser",
  userMiddleware.validateUser,
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  userMiddleware.validateRequest,
  userControllers.createUser
);

router.delete(
  "/deleteUser",
  userMiddleware.validateUser,
  userControllers.deleteUser
);

router.get(
  "/fetch/students",
  userMiddleware.validateUser,
  userControllers.fetchStudents
);

router.get(
  "/fetch/teachers",
  userMiddleware.validateUser,
  userControllers.fetchTeachers
);

router.post("/updateUser/:id", userControllers.updateUser);

module.exports = router;

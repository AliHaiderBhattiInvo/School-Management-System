const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userMiddleware = require("../middlewares/userMiddleware");

const { body } = require("express-validator");

router.post(
  "/createUser",
  userMiddleware.validateAdmin,
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  userMiddleware.validateRequest,
  userMiddleware.validateUserCreate,
  userControllers.createUser
);

router.delete(
  "/deleteUser",
  userMiddleware.validateAdmin,
  userMiddleware.validateUserExist,
  userControllers.deleteUser
);

router.get(
  "/fetch/students",
  userMiddleware.validateAdmin,
  userControllers.fetchStudents
);

router.get(
  "/fetch/teachers",
  userMiddleware.validateAdmin,
  userControllers.fetchTeachers
);

router.put(
  "/updateUser/:id",
  userMiddleware.validateUserExistID,
  userMiddleware.validateLoginUser,
  userControllers.updateUser
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");

const authControllers = require("../controllers/authControllers");

router.post("/login", userMiddleware.validateUserExist, authControllers.login);

router.post(
  "/logout",
  userMiddleware.validateUserExist,
  authControllers.logout
);

module.exports = router;

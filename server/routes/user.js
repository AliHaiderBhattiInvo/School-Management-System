const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const userMiddleware = require("../middlewares/userMiddleware")


router.post("/createUser", userMiddleware.validateUser, userControllers.createUser);

router.delete("/deleteUser", userMiddleware.validateUser, userControllers.deleteUser)

module.exports = router;

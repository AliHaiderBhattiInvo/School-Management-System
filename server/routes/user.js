const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userModel = require("../models").Users;
const studentModel = require("../models").Students;

router.post("/createUser", async (req, res) => {
  try {
    var oldUser = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!oldUser) {
      var encryptedPassword = await bcrypt.hash(req.body.password, 10);
      var user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
        token: null,
        role: req.body.role,
      });
    if(req.body.role == "student") {
        await studentModel.create({
            student_id: user.id
        })
    }
    res.status(200).json({ "user": user });
    }
    else {
        res.status(409).json("Already exist")
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

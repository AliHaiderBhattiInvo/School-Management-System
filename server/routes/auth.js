const express = require("express");
const router = express.Router();
const userModel = require("../models").Users;

const dotenv = require("dotenv");

// get config vars
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const admin = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (admin && bcrypt.compare(req.body.password, admin.password)) {
      const token = jwt.sign(
        { id: admin.id, email: req.body.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      admin.token = token;
      admin.update({
        token: token,
      });
      res.status(200).json({ admin: admin });
    } else res.status(400).json("Invalid Credentials");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/logout", async (req, res) => {
    try {
        var user = await userModel.findOne({
            where: {
              email: req.body.email,
            },
          });
          if (user) {
            const user =  await userModel.update( { token: null },
            { where: { email: req.body.email } });
          }
        res.status(200).json("User logout successfully!")
    } catch (error) {
        res.status(500).json({"error ara ha":error})
    }
});

module.exports = router;

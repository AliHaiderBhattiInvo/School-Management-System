const userModel = require("../models").Users;

const dotenv = require("dotenv");

// get config vars
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = req.user;
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("is if me aya ha")
      const token = jwt.sign(
        { id: user.id, email: req.body.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      user.update({
        token: token,
      });
      res.json({status:200,  user: user });
    } else {
      console.log('is else me aya ha')
      res.json({status:400, error:"Invalid credentials!"});
    } 
  } catch (e) {
    console.log('catch me  aya ha')
    res.status(500).json({ error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    await userModel.update(
      { token: null },
      { where: { email: req.body.email } }
    );
    res.status(200).json("User logout successfully!");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  login,
  logout,
};

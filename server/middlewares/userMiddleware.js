const userModel = require("../models").Users;
const { validationResult } = require("express-validator");

// const studentModel = require("../models").Students;
// const teacherModeel = require("../models").Teachers

const validateUser = async (req, res, next) => {
  var user = await userModel.findOne({
    where: {
      token: req.headers.token,
    },
  });
  if (user && user.role == "admin") next();
  else res.json("You're not authorized to perform this action!");
};


const validateRequest = async (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  console.log("error", errors);
  console.log("empty",!errors.isEmpty())
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else next();
};

module.exports = {
  validateUser,
  validateRequest,
};

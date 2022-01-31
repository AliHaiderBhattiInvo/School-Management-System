const bcrypt = require("bcrypt");

const userModel = require("../models").Users;
const studentModel = require("../models").Students;
const teacherModel = require("../models").Teachers;

const createUser = async (req, res) => {
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
        email: req.body.email.toLowerCase(),
        password: encryptedPassword,
        token: null,
        role: req.body.role.toLowerCase(),
      });
      if (req.body.role.toLowerCase() == "student") {
        await studentModel.create({
          student_id: user.id,
        });
      } else if (req.body.role.toLowerCase() == "teacher") {
        await teacherModel.create({
          teacher_id: user.id,
        });
      }
      res.status(200).json({ user: user });
    } else {
      res.status(409).json("Already exist");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    var oldUser = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (oldUser) {
      await userModel.destroy({
        where: {
          email: req.body.email,
        },
      });
      if (oldUser.role == "teacher")
        await teacherModel.destroy({
          where: {
            teacher_id: oldUser.id,
          },
        });
      else if (oldUser.role == "student")
        await studentModel.destroy({
          where: {
            student_id: oldUser.id,
          },
        });
    }
    res.status(200).json("User deleted successfully!")
  } catch (error) {
      res.status(500).send(error)
  }
};

module.exports = {
  createUser,
  deleteUser,
};

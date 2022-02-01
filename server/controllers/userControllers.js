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
          user.createStudent()
      } else if (req.body.role.toLowerCase() == "teacher") {
          user.createTeacher()
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
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    var user = await userModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    var loginUser = await userModel.findOne({
        where: {
            token: req.headers.token
        }
    })
    if (user) {
      if (loginUser.role == "admin" || user.token == req.headers.token) {
        await user.update({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        res.status(200).json("User updated successfully!");
      } else res.json("You're not authorized to perform this action!");
    } else res.json("User doesn't exist");
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchStudents = async (req, res) => {
  try {
    var students = await userModel.findAll({
      where: {
        role: "student",
      },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchTeachers = async (req, res) => {
  try {
    var teachers = await userModel.findAll({
      where: {
        role: "teacher",
      },
    });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  fetchStudents,
  fetchTeachers,
};

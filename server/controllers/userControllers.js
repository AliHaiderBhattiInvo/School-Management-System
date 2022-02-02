const bcrypt = require("bcrypt");
const userModel = require("../models").Users;

const createUser = async (req, res) => {
  try {
    var encryptedPassword = await bcrypt.hash(req.body.password, 10);
    var user = await userModel.create({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: encryptedPassword,
      token: null,
      role: req.body.role.toLowerCase(),
    });
    if (req.body.role.toLowerCase() == "student") {
      user.createStudent();
    } else if (req.body.role.toLowerCase() == "teacher") {
      user.createTeacher();
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.destroy({
      where: {
        email: req.body.email,
      },
    });
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;
    await user.update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json("User updated successfully!");
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

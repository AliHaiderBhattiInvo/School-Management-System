const userModel = require("../models").Users;
const teacherModel = require("../models").Teachers;
const studentModel = require("../models").Students;
const { validationResult } = require("express-validator");

const validateAdmin = async (req, res, next) => {
  var user = await userModel.findOne({
    where: {
      token: req.headers.token,
    },
  });
  if (user && user.role == "admin") next();
  else res.json("You're not authorized to perform this action!");
};

const validateTeacher = async (req, res, next) => {
  const teacher = await teacherModel.findOne({
    where: {
      teacher_id: req.body.teacher_id,
    },
  });
  if (teacher) {
    req.teacher = teacher;
    next();
  } else res.json("Teacher not found");
};

const validateStudent = async (req, res, next) => {
  const student = await studentModel.findOne({
    where: {
      student_id: req.body.student_id,
    },
  });
  if (student) {
    req.student = student;
    next();
  } else res.json("Student not found");
};

const validateRequest = async (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else next();
};

const validateUserExist = async (req, res, next) => {
  const user = await userModel.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    req.user = user;
    next();
  } else res.json({status:400, error:"Invalid credentials!"});
};

const validateUserCreate = async (req, res, next) => {
  const user = await userModel.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    req.user = user;
    next();
  } else res.json("Invalid credentials!");
};

const validateUserExistID = async (req, res, next) => {
  const user = await userModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user) {
    req.user = user;
    next();
  } else res.json("User doesn't exist");
};

const validateLoginUser = async (req, res, next) => {
  const loginUser = await validateUserToken(req.headers.token);
  const user = req.user;
  if (loginUser.role == "admin" || user.token == req.headers.token) next();
  else res.json("You're not authorized to perform this action!");
};

const validateLoginStudent = async (req, res, next) => {
  const loginUser = await validateUserToken(req.headers.token);
  const student = await validateUser(req.body.student_id, userModel, "id");
  if (student) {
    const st_id = await validateUser(student.id, studentModel, "student_id");
    if (loginUser.role == "admin" || student.token == req.headers.token) {
      req.student = st_id;
      next();
    } else res.json("You're not authorized to perform this action!");
  } else res.json("Student doesn't exist!");
};

const validateLoginTeacher = async (req, res, next) => {
  const loginUser = await validateUserToken(req.headers.token);
  const teacher = await validateUser(req.body.teacher_id, userModel, "id");
  if (teacher) {
    const te_id = await validateUser(teacher.id, teacherModel, "teacher_id");
    if (loginUser.role == "admin" || teacher.token == req.headers.token) {
      req.teacher = te_id;
      next();
    } else res.json("You're not authorized to perform this action!");
  } else res.json("Teacher doesn't exist!");
};

function validateUserToken(token) {
  return userModel.findOne({
    where: {
      token: token,
    },
  });
}

function validateUser(reqId, model, userId) {
  if (userId == "id")
    return model.findOne({
      where: {
        id: reqId,
      },
    });
  else if (userId == "teacher_id")
    return model.findOne({
      where: {
        teacher_id: reqId,
      },
    });
  else if (userId == "student_id")
    return model.findOne({
      where: {
        student_id: reqId,
      },
    });
}

module.exports = {
  validateAdmin,
  validateRequest,
  validateUserExist,
  validateUserCreate,
  validateTeacher,
  validateStudent,
  validateUserExistID,
  validateLoginUser,
  validateLoginStudent,
  validateLoginTeacher,
};

const courseModel = require("../models").Courses;

const validateExistingCourse = async (req, res, next) => {
  var oldCourse = await courseModel.findOne({
    where: {
      name: req.body.name.toLowerCase(),
    },
  });
  if (!oldCourse) next();
  else res.send("Already exist!");
};

const validateExistingCourseID = async (req, res, next) => {
  const course = await courseModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (course) {
    req.course = course;
    next();
  } else
    res
      .status(400)
      .json(`The course having an ID ${req.params.id} doesn't exist`);
};

const validateCourse = async (req, res, next) => {
  const course = await courseModel.findOne({
    where: {
      id: req.body.course_id,
    },
  });
  if (course) {
    req.course = course;
    next();
  } else res.json("Course not found");
};

module.exports = {
  validateExistingCourse,
  validateExistingCourseID,
  validateCourse,
};

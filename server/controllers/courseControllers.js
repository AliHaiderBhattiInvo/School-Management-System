const courseModel = require("../models").Courses;

const createCourse = async (req, res) => {
  try {
    var oldCourse = await courseModel.findOne({
      where: {
        name: req.body.name.toLowerCase(),
      },
    });
    if (!oldCourse) {
      await courseModel.create({
        name: req.body.name.toLowerCase(),
        teacher_id: req.body.teacher_id ? req.body.teacher_id : null,
      });
      res.status(200).send("Course created successfully");
    } else res.status(409).send("Already exist!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchCourses = async (req, res) => {
  try {
    var courses = await courseModel.findAll();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSingleCourse = async (req, res) => {
  try {
    var course = await courseModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (course) res.status(200).json({ course });
    else
      res
        .status(400)
        .json(`The course having an ID ${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCourse = async (req, res) => {
  try {
    var course = await courseModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (course) {
      await course.update({
        name: req.body.name.toLowerCase(),
      });
      res.status(200).json("Course updated successfully!");
    } else
      res
        .status(400)
        .json(`The course having an ID ${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    var course = await courseModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (course) {
      await courseModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("Course deleted successfully!");
    } else
      res
        .status(400)
        .json(`The course having an ID ${req.params.id} doesn't exist`);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createCourse,
  fetchCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};

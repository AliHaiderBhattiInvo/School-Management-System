const courseModel = require("../models").Courses;

const createCourse = async (req, res) => {
  try {
    await courseModel.create({
      name: req.body.name.toLowerCase(),
    });
    res.status(200).json("Course created successfully");
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
    const course = req.course;
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = req.course
    await course.update({
      name: req.body.name.toLowerCase(),
    });
    res.status(200).json("Course updated successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    await courseModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Course deleted successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const assignCourseStudent = async (req, res) => {
  try {
    const student = req.student;
    const course = req.course;
    await student.addCourse(course);
    res.status(200).json("Course assigned successfully to the student");
  } catch (error) {
    res.status(500).send(error);
  }
};

const studentOptedCourses = async (req, res) => {
  try {
    const student = req.student;
    const studentCourses = await student.getCourses();
    res.status(200).json(studentCourses);
  } catch (error) {
    res.status(500).json(error);
  }
};

const assignCourseTeacher = async (req, res) => {
  try {
    const course = req.course;
    const teacher = req.teacher;
    if (!course.teacher_id) {
      await teacher.addCourse(course);
      res.status(200).json("Course assigned successfully to the teacher");
    } else
      res.json(
        `The course having an ID ${course.id} already assigned to a teacher`
      );
  } catch (error) {
    res.status(500).json(error);
  }
};

const teacherAssignedCourses = async (req, res) => {
  try {
    const teacher = req.teacher;
    const teacherCourses = await teacher.getCourses();
    res.status(200).json(teacherCourses);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createCourse,
  fetchCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignCourseStudent,
  studentOptedCourses,
  assignCourseTeacher,
  teacherAssignedCourses,
};

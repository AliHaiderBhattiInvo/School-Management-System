const courseModel = require("../models").Courses
const studentModel = require("../models").Students
const teacherModel = require("../models").Teachers

const createCourse = async (req, res) => {
  try {
      var oldCourse = await courseModel.findOne({
      where: {
        name: req.body.name.toLowerCase(),
      },
    })
    if (!oldCourse) {
      await courseModel.create({
        name: req.body.name.toLowerCase()
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

const assignCourseStudent = async (req, res) => {
    try {
        var course = await courseModel.findOne({
          where: { id: req.body.course_id },
        });
        var student = await studentModel.findOne({
          where: {
            student_id: req.body.student_id,
          },
        });
        if(course && student) {
            await student.addCourse(course);
            res.status(200).json("Course assigned successfully to the student");
        }
        else res.json("Course or Student not found!")
        
      } catch (error) {
        res.status(500).send(error);
      }
}

const studentOptedCourses = async (req, res) => {
    try {
        var student = await studentModel.findOne({
            where: {
                student_id: req.body.student_id
            }
        })
        const studentCourses = await student.getCourses() 
        res.status(200).json(studentCourses)
    } catch (error) {
        res.status(500).json(error)
    }
}

const assignCourseTeacher = async (req, res) => {
    try {
        var course = await courseModel.findOne({
            where: { id: req.body.course_id },
          });
          var teacher = await teacherModel.findOne({
            where: {
              teacher_id: req.body.teacher_id,
            },
          });
          if(course && teacher) {
              if(!course.teacher_id) {
                teacher.addCourse(course)
                res.status(200).json("Course assigned successfully to the teacher");
              }
              else res.json(`The course having an ID ${course.id} already assigned to a teacher`)
          }
    } catch (error) {
        res.status(500).json(error)
    }
}

const teacherAssignedCourses = async (req, res) => {
    try {
        var teacher = await teacherModel.findOne({
            where: {
                teacher_id: req.body.teacher_id
            }
        })
        const teacherCourses = await teacher.getCourses() 
        res.status(200).json(teacherCourses)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
  createCourse,
  fetchCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignCourseStudent,
  studentOptedCourses,
  assignCourseTeacher,
  teacherAssignedCourses
};

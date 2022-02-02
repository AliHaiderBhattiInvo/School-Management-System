"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Students, {
        through: "StudentsCourses",
        foreignKey: "course_id",
      });
      this.belongsTo(models.Teachers, { foreignKey: "teacher_id" });
    }
  }
  Courses.init(
    {
      name: DataTypes.STRING,
      teacher_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  return Courses;
};

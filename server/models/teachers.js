'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {foreignKey: "teacher_id"})
      this.hasMany(models.Courses, {foreignKey: "teacher_id"});
    }
  }
  Teachers.init({
    teacher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teachers',
  });
  return Teachers;
};
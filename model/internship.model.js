const { Sequelize, DataTypes, Model, STRING } = require("sequelize");
const { sequelize } = require("../config");

class Internships extends Model {}

Internships.init(
  {
    firstName:DataTypes.STRING,
    email: DataTypes.STRING,
    lastName:DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    national_id: DataTypes.STRING,
    gender: DataTypes.STRING,
    institution: DataTypes.STRING,
    country: DataTypes.STRING,
    fieldOfStudy: DataTypes.STRING,
    dts: DataTypes.DATEONLY,
    duration: DataTypes.INTEGER,
    course: DataTypes.STRING,
    career_plan: DataTypes.STRING,
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status_of_application: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    objective: DataTypes.STRING,
    expectation: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Internships",
    timestamps: true,
  }
);

module.exports = { Internships };

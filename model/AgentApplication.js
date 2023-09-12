const { Sequelize, DataTypes, Model, STRING } = require("sequelize");
const { sequelize } = require("../config");

class AgentApplication extends Model {}

AgentApplication.init(
  {
    names: DataTypes.STRING,
    telephone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10]
      }
    },
    email_address: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    nationality: DataTypes.STRING,
    postal_box: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    fax: DataTypes.STRING,
    level: DataTypes.STRING,
    fieldDegree: DataTypes.STRING,
    specialization: DataTypes.STRING,
    year: DataTypes.STRING,
    institution: DataTypes.STRING,
    place: DataTypes.STRING,
    grade: DataTypes.STRING,
    passport: DataTypes.STRING,
    certificate: DataTypes.STRING,
    transcript: DataTypes.STRING,
    status:DataTypes.STRING,
    occupation:DataTypes.STRING,
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Agent_Application",
    timestamps: true,
  }
);

module.exports = { AgentApplication };

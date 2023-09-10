const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

class Application extends Model {}

Application.init(
  {
    level: DataTypes.STRING,
    finish_secondary: DataTypes.BOOLEAN,
    finish_university: DataTypes.BOOLEAN,
    secondary_level: DataTypes.STRING,
    university_level: DataTypes.STRING,
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    school_id: {
      type: DataTypes.INTEGER,
      defaultValue: 94,
    },
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    nationality: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country: DataTypes.STRING,
    sector: DataTypes.STRING,
    district: DataTypes.STRING,
    city_relatives: DataTypes.STRING,
    course: DataTypes.STRING,
    program: {
      type: DataTypes.ENUM("day", "night", "weekend"),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      defaultValue: "cash",
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    id_passport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transcript: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Application",
    timestamps: true,
  }
);

module.exports = { Application, sequelize };

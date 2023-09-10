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
    finish_secondary: DataTypes.STRING,
    secondaryYear: DataTypes.STRING,
    universityGraduated: DataTypes.STRING,
    universityYear: DataTypes.STRING,
    school: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    nationality: DataTypes.STRING,
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country: DataTypes.STRING,
    district: DataTypes.STRING,
    sector: DataTypes.STRING,
    familyInKigali: DataTypes.STRING,
    program: DataTypes.JSON(DataTypes.STRING), // Assumes this field stores an array
    course: DataTypes.STRING,
    passport: DataTypes.STRING, // Assuming this stores the file path or URL to the uploaded file
    transcript: DataTypes.STRING, // Assuming this stores the file path or URL to the uploaded file
    paymentMethod: DataTypes.STRING,
    school_id: {
      type: DataTypes.INTEGER,
      defaultValue: 94,
    },
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
    modelName: "Application",
    timestamps: true,
  }
);

module.exports = { Application, sequelize };

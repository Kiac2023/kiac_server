const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config");

class AbroadApplication extends Model {}

AbroadApplication.init(
  {
    university_level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["University Level", "Secondary Level"]],
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Male", "Female"]],
      },
    },
    want_to_study: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["yes", "no"]],
      },
    },
    interested: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["YES", "NO"]],
      },
    },
    desired_country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["TURKEY", "ARMENIA", "AZERBAIJAN"]],
      },
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },
    email_add: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_passport: DataTypes.STRING,
    passport_pic: DataTypes.STRING,
    vaccine: DataTypes.STRING,
    transcript_doc: DataTypes.STRING,
    status_of_application: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },

  {
    sequelize,
    modelName: "Abroad_Application",
    timestamps: true,
  }
);

module.exports = { AbroadApplication };

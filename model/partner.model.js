const { Sequelize, DataTypes, Model, STRING } = require("sequelize");
const { sequelize } = require("../config");

class Partner extends Model {}

Partner.init(
  {
    names: DataTypes.STRING,
    email: DataTypes.STRING,
    code: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    heard_us: DataTypes.STRING,
    company: DataTypes.STRING,
    business: DataTypes.STRING,
    street: DataTypes.STRING,
    addressline: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    website: DataTypes.STRING,
    status: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: "partners",
    timestamps: true,
  }
);

module.exports = { Partner };

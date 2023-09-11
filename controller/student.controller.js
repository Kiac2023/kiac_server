const Joi = require("joi");
const { Application } = require("../model/application.model");

exports.registerStudent = async (req, res) => {
  const schema = Joi.object({
    level: Joi.string().required(),
    finish_secondary: Joi.string().required(),
    secondaryYear: Joi.string().allow(null).default(null), // Add validation as needed
    universityGraduated: Joi.string().required(),
    universityYear: Joi.string().allow(null).default(null), // Add validation as needed
    school: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    nationality: Joi.string().required(),
    dob: Joi.date().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    sector: Joi.string().required(),
    district: Joi.string().required(),
    familyInKigali: Joi.string().required(),
    course: Joi.string().required(),
    passport: Joi.any(), // Add validation as needed
    transcript: Joi.any(), // Add validation as needed
    paymentMethod: Joi.string().required(),
    payment_status: Joi.boolean().default(false),
    approved: Joi.boolean().default(false),
    program: Joi.string().valid(" Day ", " Night ", " Weekend ").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.log("Validation failed:", error.details);
    return res.status(400).send(error.details);
  }
  // Access uploaded files with:
  // req.files['id_passport'][0] and req.files['transcript'][0]
  const studentData = {
    ...req.body,
    passport:
      req.files && req.files["passport"] ? req.files["passport"][0].path : null,
    transcript:
      req.files && req.files["transcript"]
        ? req.files["transcript"][0].path
        : null,
  };
  //   console.log(req.files);

  try {
    const existingStudent = await Application.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existingStudent) {
      console.log(
        "Blocking registration: Application with email:",
        req.body.email,
        "already exists."
      );
      return res.status(400).json({
        message: "An application with this email has already applied.",
      });
    }

    const application = await Application.create(studentData);
    res.status(201).json({
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Error occurred",
      details: error.message,
    });
  }
};

// get applications

exports.getApplicationsByApprovalStatus = async (req, res) => {
  const approved = req.query.approved === "true"; // Convert the query string to a boolean

  try {
    const applications = await Application.findAll({
      where: {
        approved: approved,
      },
    });

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applications found with the provided approval status.",
      });
    }

    res.status(200).json({
      message: "Applications fetched successfully.",
      applications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred",
      details: error.message,
    });
  }
};

// update payment 

exports.updatePaymentStatusAndApproved = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findOne({
      where: {
        id: id,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "No application found with the provided ID.",
      });
    }

    const updatedApplication = await application.update({
      payment_status: true,
      approved:true

    });

    res.status(200).json({
      message: "Application updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred",
      details: error.message,
    });
  }
}

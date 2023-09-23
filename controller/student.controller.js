const Joi = require("joi");
const { Application } = require("../model/application.model");

exports.registerStudent = async (req, res) => {
  try {
    const schema = Joi.object({
      level: Joi.string().required(),
      finish_secondary: Joi.string().required(),
      secondaryYear: Joi.string().allow("").optional(), // Add validation as needed
      universityGraduated: Joi.string().required(),
      universityYear: Joi.string().allow("").optional(), // Add validation as needed
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
      program: Joi.string().required(),
      status_of_application: Joi.string().default("pending"),
    });
    // Access uploaded files with:
    // req.files['id_passport'][0] and req.files['transcript'][0]
    const studentData = {
      ...req.body,
      passport:
        req.files && req.files["passport"]
          ? req.files["passport"][0].path
          : null,
      transcript:
        req.files && req.files["transcript"]
          ? req.files["transcript"][0].path
          : null,
    };
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        error:
          "Invalid or Already used Data Given.Check file size not exceed 100kb",
        errors: error.details,
      });
    }
    //   console.log(req.files);
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
        success: false,
        message: "An application with this email has already applied.",
      });
    }

    const application = new Application(studentData);
    await application.save();

    res.json({
      success: true,
      message: "Your application was submitted successfully!",
    });
  } catch (error) {
    console.error("Error during student registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

// get applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: {
        approved: false,
        status_of_application: "pending",
      },
    });
    return res.status(200).json(applications);
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
    const fullName = application.names;
    // const nameParts = fullName.split(" ");
    const agentData = {
      fname: application.firstName,
      lname: application.lastName,
      email: application.email,
      phone: application.phone,
      privilege: 20,
      country: application.country,
      city: application.district,
      address: application.sector,
      shift: 7,
      course: application.course,
      dob: application.dob,
      district: application.district,
      sector: application.sector,
      program: application.program,
      sex: application.gender,
    };
    const updatedApplication = await application.update({
      payment_status: true,
      approved: true,
      status_of_application: "accepted",
    });

    res.status(200).json({
      message: "Application updated successfully.",
      application: updatedApplication,
      agent: agentData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred",
      details: error.message,
    });
  }
};

// delete applications
exports.rejectApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findOne({
      where: {
        id,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Validate the application data against the schema
    // const { error } = applicationSchema.validate(application);
    // if (error) {
    //   return res.status(400).json({
    //     message: "Validation error",
    //     details: error.details.map((d) => d.message),
    //   });
    // }

    // Update the application status to "rejected"
    application.status_of_application = "rejected";
    await application.save();

    res.status(200).json({
      message: "Application rejected successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred",
      details: error.message,
    });
  }
};

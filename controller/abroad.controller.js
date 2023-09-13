const Joi = require("joi");
const { AbroadApplication } = require("../model/abroad.model");

exports.StudyAbroadApplication = async (req, res) => {
  try {
    const schema = Joi.object({
      university_level: Joi.string().required(),
      gender: Joi.string().valid("Male", "Female").required(),
      want_to_study: Joi.string().valid("yes", "no").required(),
      interested: Joi.string().valid("YES", "NO").required(),
      desired_country: Joi.string()
        .valid("TURKEY", "ARMENIA", "AZERBAIJAN")
        .required(),
      birth_date: Joi.date().required(),
      phone_number: Joi.string()
        .pattern(/^\d{10}$/)
        .required(),
      email_add: Joi.string().email().required(),
      program: Joi.string().required(),
      id_passport: Joi.any(),
      passport_pic: Joi.any(),
      vaccine: Joi.any(),
      transcript_doc: Joi.any(),
      payment_status: Joi.boolean().default(false),
      approved: Joi.boolean().default(false),
      status_of_application: Joi.string().default("pending"),
    });
    // Access uploaded files with:
    // req.files['id_passport'][0] and req.files['transcript'][0]
    const studentData = {
      ...req.body,
      passport_pic:
        req.files && req.files["passport"]
          ? req.files["passport"][0].path
          : null,
      id_passport:
        req.files && req.files["id_passport"]
          ? req.files["id_passport"][0].path
          : null,
      transcript_doc:
        req.files && req.files["transcript"]
          ? req.files["transcript"][0].path
          : null,
      vaccine:
        req.files && req.files["vaccine"] ? req.files["vaccine"][0].path : null,
    };

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: "Invalid or Already used Data Given.",
        errors: error.details,
      });
    }

    const existingStudent = await AbroadApplication.findOne({
      where: {
        email_add: req.body.email_add,
      },
    });

    if (existingStudent) {
      console.log(
        "Blocking registration: AbroadApplication with email:",
        req.body.email_add,
        "already exists."
      );
      return res.status(400).json({
        success: false,
        message: "An application with this email has already applied.",
      });
    }

    const application = new AbroadApplication(studentData);
    await application.save();

    res.json({
      success: true,
      message: "Your application was submitted successfully!",
    });
  } catch (error) {
    console.error("Error during student registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


exports.getAllAbroadApplications = async (req, res) => {
  try {
    const applications = await AbroadApplication.findAll({
      where: {
        approved: false,
        status_of_application: 'pending',
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

// delete applications
exports.rejectApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await AbroadApplication.findOne({
      where: {
        id,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

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


exports.updatePaymentStatusAndApproved = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await AbroadApplication.findOne({
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
      approved: true,
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
};

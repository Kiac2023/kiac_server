const Joi = require("joi");
const { Partners } = require("../model/partner.model");

exports.postPartner = async (req, res) => {
  try {
    const createPartnerSchema = Joi.object({
      firstName: Joi.string().required(),
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().optional(),
      dob: Joi.date().optional(),
      national_id: Joi.string().optional(),
      gender: Joi.string().valid("male", "female", "other").optional(),
      institution: Joi.string().optional(),
      country: Joi.string().optional(),
      fieldOfStudy: Joi.string().optional(),
      dts: Joi.date().optional(),
      duration: Joi.number().optional(),
      course: Joi.string().optional(),
      career_plan: Joi.string().optional(),
      objective: Joi.string().optional(),
      expectation: Joi.string().optional(),
      payment_status: Joi.boolean(),
      approved: Joi.boolean(),
      status_of_application: Joi.string().default("pending"),
    });

    const studentData = req.body;

    const { error } = createPartnerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: "Invalid or Already used Data Given.",
        errors: error.details,
      });
    }

    const existingStudent = await Partners.findOne({
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

    const application = new Partners(studentData);
    await application.save();

    // Send a successful response back to the client
    return res
      .status(200)
      .json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error during student registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// get applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Partners.findAll({
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

//delete agent
exports.rejectApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Partners.findOne({
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
    const application = await Partners.findOne({
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
      status_of_application: "accepted",
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

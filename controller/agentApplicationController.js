const Joi = require("joi");
const { AgentApplication } = require("../model/AgentApplication");

exports.postAgentApplication = async (req, res) => {
  try {
    const agentApplicationSchema = Joi.object({
      names: Joi.string().required(),
      telephone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      email_address: Joi.string().email(),
      nationality: Joi.string(),
      postal_box: Joi.string(),
      district: Joi.string(),
      province: Joi.string(),
      country: Joi.string(),
      occupation: Joi.string().required(),
      status: Joi.string().required(),
      fax: Joi.string(),
      level: Joi.string(),
      fieldDegree: Joi.string(),
      specialization: Joi.string(),
      year: Joi.string(),
      institution: Joi.string(),
      place: Joi.string(),
      grade: Joi.string(),
      passport: Joi.any(),
      certificate: Joi.any(),
      transcript: Joi.any(),
      payment_status: Joi.boolean(),
      approved: Joi.boolean(),
      status_of_application: Joi.string().default("pending"),
    });
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
      certificate:
        req.files && req.files["certificate"]
          ? req.files["certificate"][0].path
          : null,
    };

    const { error } = agentApplicationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: "Invalid or Already used Data Given.",
        errors: error.details,
      });
    }
    const existingStudent = await AgentApplication.findOne({
      where: {
        email_address: req.body.email_address,
      },
    });
    if (existingStudent) {
      console.log(
        "Blocking registration: Application with email:",
        req.body.email_address,
        "already exists."
      );
      return res.status(400).json({
        success: false,
        message: "An application with this email has already applied.",
      });
    }

    const application = new AgentApplication(studentData);
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
exports.getAllAgentApplications = async (req, res) => {
  try {
    const applications = await AgentApplication.findAll({
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
    const application = await AgentApplication.findOne({
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
    const { error } = applicationSchema.validate(application);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
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

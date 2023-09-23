const Joi = require("joi");
const { Partner } = require("../model/partner.model");

exports.postPartner = async (req, res) => {
  try {
    const createPartnerchema = Joi.object({
      names: Joi.string().required(),
      email: Joi.string().email().required(),
      code: Joi.string().required(),
      phone_number: Joi.string().required(),
      // dob: Joi.date().optional(),
      heard_us: Joi.string().optional(),
      //gender: Joi.string().valid("male", "female", "other").optional(),
      company: Joi.string().optional(),
      business: Joi.string().optional(),
      street: Joi.string().optional(),
      addressline: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      zip_code: Joi.string().optional(),
      website: Joi.string().optional(),
      status: Joi.string().optional(),
      //expectation: Joi.string().optional(),
      payment_status: Joi.boolean(),
      approved: Joi.boolean(),
      status_of_application: Joi.string().default("pending"),
    });

    const studentData = req.body;

    const { error } = createPartnerchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        error: "Invalid or Already used Data Given.",
        errors: error.details,
      });
    }

    const existingStudent = await Partner.findOne({
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

    const application = new Partner(studentData);
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
    const applications = await Partner.findAll({
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
    const application = await Partner.findOne({
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
    const application = await Partner.findOne({
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

    const fullName = application.names;
    const nameParts = fullName.split(" ");
    const agentData = {
      fname: nameParts[0],
      lname: nameParts.slice(1).join(" "),
      email: application.email,
      phone: application.phone_number,
      privilege: 19,
      country: application.state,
      city: application.province,
      address: application.street,
      shift: 7,
    };
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

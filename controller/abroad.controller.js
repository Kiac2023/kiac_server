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
        "Blocking registration: Application with email:",
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

//
//     const applications = await Application.findAll({
//       where: {
//         approved,
//       },
//     });
//     res.status(200).json({
//       message: "Applications retrieved successfully",
//       applications,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({
//       message: "Error occurred",
//       details: error.message,
//     });
//   }
// };
//
// // update application
//
// delete applications
//
// exports.deleteApplication = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const application = await Application.findOne({
//       where: {
//         id,
//       },
//     });
//     if (!application) {
//       return res.status(404).json({
//         message: "Application not found",
//       });
//     }
//     await application.destroy();
//     res.status(200).json({
//       message: "Application deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({
//       message: "Error occurred",
//       details: error.message,
//     });
//   }
// };
//

const Joi = require("joi");
const { AbroadApplication } = require("../model/abroad.model");

exports.StudyAbroadApplication = async (req, res) => {
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
  });
  console.log(req.body);

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
    id_passport:
      req.files && req.files["id_passport"]
        ? req.files["id_passport"][0].path
        : null,
    transcript:
      req.files && req.files["transcript"]
        ? req.files["transcript"][0].path
        : null,
    vaccine:
      req.files && req.files["vaccine"] ? req.files["vaccine"][0].path : null,
  };

  //   console.log(req.files);

  try {
    const existingStudent = await AbroadApplication.findOne({
      where: {
        email_add: req.body.email_add,
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

    const application = await AbroadApplication.create(studentData);
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

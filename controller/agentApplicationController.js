const Joi = require("joi");
const { AgentApplication } = require("../model/AgentApplication");


exports.postAgentApplication = async (req, res) => {
    console.log(req.body);
    const agentApplicationSchema = Joi.object({
        names: Joi.string().required(),
        telephone: Joi.string().required(),
        email_address: Joi.string().email().required(),
        address: Joi.string().required(),
        level: Joi.string().required(),
        program: Joi.string().valid("Day", "Night", "Weekend").required(), // Could be improved
        course: Joi.string().required(),
      });

      const { error } = agentApplicationSchema.validate(req.body);
      if (error) {
        console.log("Validation failed:", error.details);
        return res.status(400).send(error.details);
      }

      //   console.log(req.files);
    
      try {
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
            message: "An application with this email has already applied.",
          });
        }
    
        const application = await AgentApplication.create(req.body);
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



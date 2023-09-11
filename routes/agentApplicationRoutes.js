const express = require("express");
const {
  postAgentApplication,
  getAllAgentApplications
} = require("../controller/agentApplicationController");

const router = express.Router();

router.post("/application", postAgentApplication);
router.get('/all/applications', getAllAgentApplications);


module.exports =  router ;

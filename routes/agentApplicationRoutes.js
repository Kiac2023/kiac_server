const express = require("express");
const {
  postAgentApplication,
} = require("../controller/agentApplicationController");

const router = express.Router();

router.post("/application", postAgentApplication);

module.exports =  router ;

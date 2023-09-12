const express = require("express");
const upload = require("../middlewares/upload.middleware");

const {
  postAgentApplication,
  getAllAgentApplications
} = require("../controller/agentApplicationController");

const router = express.Router();

router.post("/application",
upload.fields([
  { name: "transcript", maxCount: 1 },
  { name: "passport" },
  { name: "certificate" },
]),
postAgentApplication);
router.get('/all/applications', getAllAgentApplications);


module.exports =  router ;

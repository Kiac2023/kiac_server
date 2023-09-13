const express = require("express");
const upload = require("../middlewares/upload.middleware");

const {
  postAgentApplication,
  rejectApplication,
  getApplications,
  updatePaymentStatusAndApproved
} = require("../controller/agentApplicationController");

const router = express.Router();

router.post("/application",
upload.fields([
  { name: "transcript", maxCount: 1 },
  { name: "passport" },
  { name: "certificate" },
]),
postAgentApplication);
router.get('/all/applications', getApplications);
router.put("/application/:id/reject", rejectApplication)
router.put('/application/:id/updateStatus',updatePaymentStatusAndApproved) 



module.exports =  router ;

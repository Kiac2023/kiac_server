const express = require("express");
const upload = require("../middlewares/upload.middleware");
const {
  postPartner,
  getApplications,
  rejectApplication,
  updatePaymentStatusAndApproved,
} = require("../controller/internship.controller");

const router = express.Router();

router.post("/application", postPartner);
router.get("/all/applications", getApplications);
router.put("/application/:id/reject", rejectApplication);
router.put("/application/:id/updateStatus", updatePaymentStatusAndApproved);

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  registerStudent,
  getApplicationsByApprovalStatus,
  updatePaymentStatusAndApproved,
} = require("../controller/student.controller");

router.post(
  "/register",
  upload.fields([
    { name: "passport", maxCount: 1 },
    { name: "transcript", maxCount: 1 },
  ]),
  registerStudent
);

router.get("/applications", getApplicationsByApprovalStatus);

// updatePaymentStatusAndApproved route
router.put('/application/:id/updateStatus',updatePaymentStatusAndApproved) 


module.exports = router;
